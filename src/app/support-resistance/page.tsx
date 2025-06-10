'use client';
import React,{useState,useEffect} from 'react';
// import Link from 'next/link';
import { useRouter } from "next/navigation";
import axiosInstance from '@/services/axios/axiosInstance';
import ScriptDisplay from "@/components/ScriptDisplay"
import  {ScriptData} from "@/types/globalTypes"
import AccordionList from "@/components/AccordionList"

import { useAuth } from '@/store/AuthContext';

// interface ScriptData {
//   name: string | string;
//   image_url: string | string;
//   low_value: number | string;
// }


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
function Page() {

    // const [authUrl,setAuthUrl]=useState('')
    // const [authCodeUrl,setAuthCodeUrl]=useState('')
    // const [authorizationProcess,setAuthorizationProcess]=useState('')
    const [script, setScript] = useState('');
    const [etf, setETF] = useState('');
    const [scripResult, setScripResult] = useState<ScriptData | null>(null);
    const [allScripResult, setAllScripResult] = useState<ScriptData[]>([]);
    const [allScriptLoading, setAllScriptLoading] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<'script' | 'etf'>('script');
    
    
    
    
    const router = useRouter();
    const { isLoggedIn,isFyersLoggedIn } = useAuth();    
    // const { fyersAccessToken} = useAuth();
    useEffect(() => {
      // const token = localStorage.getItem("token");
      console.log("********isLoggedIn",isLoggedIn)
      console.log("********isFyersLoggedIn",isFyersLoggedIn)
      if (!isLoggedIn) {
        console.log("****login")
        router.push("/login");
      }else{
        if(!isFyersLoggedIn){
          console.log("****fyerslogin")
          router.push("/fyersLogin");
        }
      }
    }, []);
    // const GenerateAccesstoken = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     try {
    //       const res = await axiosInstance.post(`${API_URL}/generate-access-token/`,{authCodeUrl});
    //       console.log('Response:', res.data.message.status_code);
    //       console.log('Response fyers_access_token:', res.data.message.fyers_access_token);
    //       // alert('Submitted successfully!');
    //       setAuthorizationProcess(res.data.message.status_code)
    //       // fyersAccessToken(res.data.message.fyers_access_token)
    //     } catch (error) {
    //       console.error('Error submitting:', error);
    //       alert('Submission failed');
    //     }
    //   };

    //   const fetchAuthCode = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await axiosInstance.get(`${API_URL}/get-auth-url/`);
    //       setAuthUrl(response.data.auth_url);
    //       // console.log('Response:', res.data);
    //     } catch (error) {
    //       console.error('Error submitting:', error);
    //     }
    //   };


      const executeScript = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(`${API_URL}/get-script?script=${script}`)
        try {
          const res = await axiosInstance.get(`${API_URL}/get-script/${script}`);
          // const res = await axiosInstance.get(`${API_URL}/get-script/${script}`,{"fyers_token":});
          console.log(':::::::::::::::::::::::Response:::::::::::::::', res.data);
          setScripResult(res.data)

        } catch (error) {
          console.error('Error submitting:', error);

        }
      };

      const executeAllScript = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log(`${API_URL}/get-script?script=${script}`)
        setAllScriptLoading(true)
        try {
          const res = await axiosInstance.get(`${API_URL}/get-scripts/${etf}`);
          console.log('Response:', res.data);
          setAllScripResult(res.data.records)
          setAllScriptLoading(false)
        } catch (error) {
          console.error('Error submitting:', error);

        }
      };

  return (
    <div className="flex flex-col items-center mt-20">
      
      {/* <div className={authorizationProcess === '' ? 'hidden' : 'block'}> */}
      {/* ======================================== */}
      {/* 🔘 Radio Buttons */}
      <div className="mb-6">
        <label className="mr-4">
          <input
            type="radio"
            value="script"
            checked={selectedOption === 'script'}
            onChange={() => setSelectedOption('script')}
            className="mr-1"
          />
          Script
        </label>
        <label>
          <input
            type="radio"
            value="etf"
            checked={selectedOption === 'etf'}
            onChange={() => setSelectedOption('etf')}
            className="mr-1"
          />
          ETF
        </label>
      </div>
      {selectedOption === 'script' && (
      // <div>
        <div>
          <form className="w-full max-w-sm" onSubmit={executeScript}>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="script">
                Select Script
                </label>
                <select
                id="script"
                onChange={(e) => setScript(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">-- Select --</option>
                <option value="cipla">CIPLA</option>
                <option value="piind">PIIND</option>
                <option value="DRReddy">Dr Reddy</option>
                <option value="HDFCBANK">HDFC BANK</option>
                </select>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          {/* {JSON.stringify(scripResult)} */}
            {scripResult && scripResult?.image_url && (<>
            <ScriptDisplay name={scripResult?.name} image_url={`${IMAGE_URL}${scripResult?.image_url}`} low_value={scripResult?.low_value}/>
            </>
          )}
        </div>
      )}
        
        {selectedOption === 'etf' && (
        <div>
          <form className="w-full max-w-sm" onSubmit={executeAllScript}>
            <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="etf">
                Select ETF
                </label>
                <select
                id="etf"
                onChange={(e) => setETF(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                <option value="">-- Select --</option>
                <option value="NIFTY50">NIFYT 50</option>
                <option value="NIFTY100">NIFTY 100</option>
                <option value="NIFTY200">NIFTY 200</option>
                <option value="NIFTY500">NIFTY 500</option>
                </select>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
          {allScriptLoading?(<><label>Loading...</label></>):(
            <div className='py-2'>
                {allScripResult && (<AccordionList allScripResult={allScripResult} />)}
            </div>
            )}
        </div>
         )}
      </div>

      // </div>
    // </div>
  );
}

export default Page;
