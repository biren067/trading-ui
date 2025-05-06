'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '@/services/axios/axiosInstance';
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: string | null;
  login: (username: string, password: string) => Promise<void>;
  userName: string | null;
  logout: () => void;
  refreshTokenFn: () => Promise<void>;
  isLoggedIn: boolean | false;
  isFyersLoggedIn: boolean | false;
  updateFyersLoggin: (value: boolean) =>  Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const [userName, setUserName] = useState('')
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFyersLoggedIn, setIsFyersLoggedIn] = useState(false);
  // const [fyersToken, setFyersToken] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAccessToken(localStorage.getItem('accessToken'));
      setRefreshToken(localStorage.getItem('refreshToken'));
      setRole(localStorage.getItem('role'));
    }
  }, []);
  const updateFyersLoggin = (value:boolean)=>(    setIsFyersLoggedIn(value))
  // const fyersAccessToken = (value: string) => {
  //   console.log("============setting fyers token:",value)
  //   localStorage.setItem('fyers_access_token',value)
  //   console.log("lacal storage set::",localStorage)
  //   setFyersToken(value);
  // };
  
  const login = async (username: string, password: string) => {
    const uri = `${API_URL}/login/`
    console.log("=============login URL::",uri)
    const response = await axiosInstance.post(uri, { username, password });
    console.log("After successful login",response)
    const { access, refresh } = response.data;
    setAccessToken(access);
    setRefreshToken(refresh);
    setIsLoggedIn(true);
    setIsFyersLoggedIn(false);
    console.log("Role is ::",response.data.user.role)
    setRole(response.data.user.role);
    setUserName(username)
    setLastActivity(Date.now());

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('role', response.data.user.role);
    }
    console.log("response::",response,role)
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setIsFyersLoggedIn(false);
    setRole(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('role');
      localStorage.removeItem('fyers_access_token')
    }
    setIsLoggedIn(false)
    setIsFyersLoggedIn(false)
    console.log("*************Logout called:",localStorage)
    router.push('/login');
  };

  const refreshTokenFn = async () => {
    if (!refreshToken) throw new Error('No refresh token');
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refreshToken });

    setAccessToken(response.data.access);

    setLastActivity(Date.now());
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.access);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = Date.now();
      const idleTime = (now - lastActivity) / 1000 / 60; // Minutes
      if (idleTime >= 30) {
        logout();
      } else if (idleTime >= 5 && refreshToken) {
        try {
          await refreshTokenFn();
        } catch {
          logout();
        }
      }
    }, 60000); // Check every minute

    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [lastActivity, refreshToken]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, role, login, logout, userName, refreshTokenFn,isLoggedIn,isFyersLoggedIn,updateFyersLoggin }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};