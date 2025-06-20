import React,{useState} from 'react';
// import Image from 'next/image';
import  {ScriptData} from "@/types/globalTypes"
import { stockBought } from '@/utils/endpoints';
import axiosInstance from '@/services/axios/axiosInstance';
// import { FingerPrintIcon } from '@heroicons/react/16/solid';

const API_URL = process.env.NEXT_PUBLIC_API_URL
function ScriptDisplay({ name, image_url }:ScriptData) {
  const [errorLog,setErrorLog] = useState('')
  const [successLog,setSuccessLog] = useState('')
  const [formData, setFormData] = useState({
    script:name,
    status:'Hold',
    boughtAt: '',
    targetAt: '',
    boughtDate: new Date().toISOString().split('T')[0],
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("formData:", formData);

      const uri = `${API_URL}${stockBought}`;
      if (formData.boughtAt == '' || formData.targetAt == '') {
        setErrorLog("Please update Bought At and Target At ");
      } else {
        const response = await axiosInstance.post(uri, { formData });
        if (!response) throw new Error('Failed to submit data');

        const result = await response.data;
        setSuccessLog(`Successfully Stored ${formData.script}`);
        console.log('Success saved:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  return (
    <div className="border-2 border-gray-300 rounded p-1 mb-1 mx-auto my-4">
   
      {image_url && (
        <img
          src={`${image_url}`}
          alt={`${name} Chart`}
          className="rounded-lg mb-4 object-contain"
          style={{ maxHeight: 300 }}
        />
      )}
        <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="boughtAt" className='w-1/2'>Bought At</label>
              <input id="boughtAt" name="boughtAt" type="text" value={formData.boughtAt} onChange={handleChange} 
              className="border px-3 py-2 rounded w-full"
              inputMode="decimal"
              autoComplete="off"
              />
            </div>

            <div className="flex flex-row justify-between items-center">
              <label htmlFor="targetAt" className='w-1/2'>Target At</label>
              <input id="targetAt" name="targetAt" type="text"  value={formData.targetAt} 
              onChange={handleChange} 
              className="border px-3 py-2 rounded w-full"
              inputMode="decimal"
              autoComplete="off"
           />
            </div>
            
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="boughtDate" className='w-1/2'>Bought Date</label>
              <input
                    id="boughtDate"
                    name="boughtDate"
                    type="date"
                    value={formData.boughtDate}
                    onChange={handleChange}
                    className="border px-3 py-2 rounded w-full"
                  />

            </div>
            {/* <div className="flex justify-end"> */}
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mt-2">
                BUY
              </button>
            {/* </div> */}
            {/* <div className='flex justify-center'>
              <p className='text-red-400'>{errorLog}</p>
            </div>
            <div className='flex justify-center'>
              <p className='text-green-400'>{successLog}</p>
            </div> */}
            {errorLog && (
              <p className="text-center text-red-400">{errorLog}</p>
            )}
            {successLog && (
              <p className="text-center text-green-400">{successLog}</p>
            )}

          </div>
        </form>
      </div>

    </div>
  );
}

export default ScriptDisplay;
