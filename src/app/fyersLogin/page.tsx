'use client';
import React,{useState,useEffect} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/services/axios/axiosInstance';
import { useAuth } from '@/store/AuthContext';



const API_URL = process.env.NEXT_PUBLIC_API_URL;
function FyerLogin() {

    const {isLoggedIn, isFyersLoggedIn,updateFyersLoggin } = useAuth();
    const [authUrl,setAuthUrl]=useState('')
    const [authCodeUrl,setAuthCodeUrl]=useState('')
    const [authorizationProcess,setAuthorizationProcess]=useState('')
    const router = useRouter();
    const GenerateAccesstoken = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const res = await axiosInstance.post(`${API_URL}/generate-access-token/`,{authCodeUrl});
          console.log('Response:', res.data.message.status_code);
          console.log('Response fyers_access_token:', res.data.message.fyers_access_token);
          // alert('Submitted successfully!');
          setAuthorizationProcess(res.data.message.status_code)
          if(res.data.message.fyers_access_token){
              updateFyersLoggin(true)
            router.push("/support-resistance")
            }
          // fyersAccessToken(res.data.message.fyers_access_token)
        } catch (error) {
          console.error('Error submitting:', error);
          alert('Submission failed');
        }
      };

      const fetchAuthCode = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await axiosInstance.get(`${API_URL}/get-auth-url/`);
          setAuthUrl(response.data.auth_url);
          // console.log('Response:', res.data);
        } catch (error) {
          console.error('Error submitting:', error);
        }
      }
      useEffect(()=>{
        if (!isLoggedIn){
            router.push("/login")
        }
      })

    //   useEffect(()=>{
    //     updateFyersLoggin(true)
    //     router.push("/support-resistance")
    //   },[authorizationProcess])
  return (
    <div className="flex flex-col items-center mt-20">
    <h1 className="text-2xl font-bold mb-6">Get Fyers Login</h1>
      <div className={authorizationProcess === '' ? 'block' : 'hidden'}>
      {authUrl?(<></>):(
      <form className="w-full max-w-sm" onSubmit={ fetchAuthCode} >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="script">
              Fetch Auth Code:
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
        




        {authUrl && (
          <div>
              <div className='flex gap-2 justify-center items-align'>
                <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="script"> Generate Auth token </label>
                    {/* <input type="text" name="access_token" value={authCodeUrl}  onChange={(e) => setAuthCodeUrl(e.target.value)} className="w-full p-2 border rounded mb-2" /> */}
                </div>
                <Link href={authUrl} target="_blank" rel="noopener noreferrer" className=" btn text-blue-600 h-10">
                  Get Access Token
              </Link>
            </div>
          <form className="w-full max-w-sm" onSubmit={ GenerateAccesstoken}>
          <div className="mb-4"> 
           <label className="block text-gray-700 font-semibold mb-2" htmlFor="script"> Generate Access Token </label>
              <input type="text" name="access_token" value={authCodeUrl}  onChange={(e) => setAuthCodeUrl(e.target.value)} className="w-full p-2 border rounded mb-2" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        </div>
         
          )}
        </div>
    </div>
  )
}

export default FyerLogin