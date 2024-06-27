'use client'
import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import propertiesLoader from '@/utils/propertiesLoader';
import { deleteProperty } from '@/utils/Firebase';

const EditProperties = ({ onEdit }) => {
    const[properties, setProperties] = useState([])

  useEffect(() => {
    const loadProperties = async () => {
      const loadedProperties = await propertiesLoader();
      setProperties(loadedProperties);
    };
    loadProperties();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-20 mt-20">
      {properties.map((prop) => (
        <div key={prop.id} className="border rounded-lg shadow-lg p-4 w-80 bg-red-100">
        <div className='flex justify-between'>
          <h1 className="text-xl font-bold mb-2 text-red-600">{prop.ProjectName}</h1>
          <h3 className="text-lg text-gray-700 mb-4">${prop.ProjectAmount}</h3>
        </div>
          <div className="service-type mb-4">
            <h3 className="font-semibold">{prop.Service}</h3>
            <p>{prop.ProjectType}</p>
          </div>
          <span className="block mb-4 text-red-600">
            {prop.Bedrooms} {prop.Bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </span>
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(prop)}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <Edit className="w-5 h-5 mr-1" /> Edit
            </button>
            <button
              onClick={() => deleteProperty(prop.id, prop.ImagePath, setProperties)}
              className="flex items-center text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5 mr-1" /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditProperties;
