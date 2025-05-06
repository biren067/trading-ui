'use client'
import React,{useState,useEffect} from 'react';
import DashBoard from "@/components/dashboard/StockTable";
import { stockBoughtList } from '@/utils/endpoints';
import axiosInstance from '@/services/axios/axiosInstance';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const sampleColumns = [
  { Header: "Script", accessor: "name" },
  { Header: "Bought At", accessor: "boughtAt" },
  { Header: "Target At", accessor: "targetAt" },
  { Header: "Bought Date", accessor: "boughtDate" },
  { Header: "Status", accessor: "status" },
];

export default function Dashboard() {
  const [isloading,setIsLoading] = useState(true)
  const [stockList,setStockList] = useState({})
  useEffect(() => {
    const executeScript = async () => {
      try {
        const res = await axiosInstance.get(`${API_URL}${stockBoughtList}`);
        console.log(":::::Stock Data:::::", res.data);
        setStockList(res.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    executeScript();
  }, []);
    return (

      <div>
        {isloading?
        (<><p>Loading records from database</p></>):
        (<><h2 className="text-2xl font-bold mb-4">My Stocks</h2>
        <DashBoard columns={sampleColumns} data={stockList} />
        </>)
      }
        
      </div>
    );
  }