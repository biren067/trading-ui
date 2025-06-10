import React, { useState } from 'react';
import ScriptDisplay from '@/components/ScriptDisplay';
import {ScriptData} from '@/types/globalTypes';
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

interface Props {
  allScripResult: ScriptData[];
}

const AccordionList: React.FC<Props> = ({ allScripResult }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {allScripResult.map((item, index) => (
        <div key={index} className="border border-2 rounded shadow mx-2">
          <div
            onClick={() => toggleAccordion(index)}
              className="cursor-pointer rounded px-4 py-2 bg-cyan-100 hover:bg-gray-300 font-semibold flex justify-between transition-all duration-300"
          >
            <span>{item.name}</span>
            <span className="bg-green-600 px-2 mx-2 rounded text-white">{item.low_value}</span>
          </div>

          {openIndex === index && (
            <div className="p-4 bg-white">
              <ScriptDisplay
                name={item.name}
                image_url={`${IMAGE_URL}${item.image_url}`}
                low_value={item.low_value}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default AccordionList;
