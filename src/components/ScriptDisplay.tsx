import React from 'react';
import  {ScriptData} from "@/types/globalTypes"
function ScriptDisplay({ name, image_url }:ScriptData) {
  return (
    <div className="border-2 border-gray-300 rounded p-4 mb-4">
   
      {image_url && (
        <img
          src={`${image_url}`}
          alt={`${name} Chart`}
          style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }}
        />
      )}
    </div>
  );
}

export default ScriptDisplay;
