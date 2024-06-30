'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProperty,  auth, storage, updateProperty } from '@/utils/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import EditProperties from './EditProperties';
import { ref, uploadBytes } from 'firebase/storage';

const Page = () => {
  const [user, loading] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] =useState('');
  const [sucess, setSuccess] = useState('')
  const [properties, setProperties] = useState({
    Price: '',
    ProjectType: '',
    ProjectAmount: '',
    ProjectName: '',
    Locate: '',
    Service: '',
    Bedrooms: '',
    State: '',
    Description:'',
    imageFiles: []
  });
  const router = useRouter();
  const formRef = useRef(null)

  //console.log(user)

  useEffect(() => {
   if(!loading && !user){
    router.push('./Auth/SignIn')
   }  
  }, [loading, router, user]);

  const locations = ['Gold State', 'Blue State', 'Marquess State', 'Grey State'];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setProperties((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const selectBedroom = (value) => {
    setProperties((prev) => ({
      ...prev,
      Bedrooms: prev.Bedrooms === value ? '' : value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProperties((prev) => ({
      ...prev,
      imageFiles: files
    }));
  }

  const clearMessages = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous errors
    setError('');
    setSuccess('')
    try {
      /*Check if the user is trying to update data and save the updated data*/
      if (isEditing) {
        const updatedData = {};
  
        if (properties.Price) updatedData.ProjectAmount = 
        properties.Price;
        if (properties.ProjectType) updatedData.ProjectType = 
        properties.ProjectType;
        if (properties.ProjectName) updatedData.ProjectName = 
        properties.ProjectName;
        if (properties.Service) updatedData.Service = 
        properties.Service;
        if (properties.Bedrooms) updatedData.Bedrooms = 
        properties.Bedrooms;
        if (properties.State) updatedData.State = 
        properties.State;
        if (properties.Description) updatedData.About = 
        properties.Description;
        if (properties.Locate) updatedData.Location = 
        properties.Locate;
  
        // Change ImagePath if new images are added, otherwise disable ImagePath input and
        //leave ImageFiles blank
        if (properties.imageFiles.length > 0) {
          if (!properties.ImagePath) {
            setError('Image path must be provided if uploading new images.');
            clearMessages()
            return;
          }
          updatedData.ImagePath = properties.ImagePath; // Use provided ImagePath
          // Upload new images
          await Promise.all(properties.imageFiles.map((file, index) => {
            const storageRef = ref(storage, `${updatedData.ImagePath}/${updatedData.ImagePath}${index + 1}`);
            return uploadBytes(storageRef, file);
          }));
        } else {
          updatedData.ImagePath = properties.ImagePath; // Retain old ImagePath if no new images
        }
  
        await updateProperty(properties.id, updatedData);
       setSuccess('Property updated successfully, refresh to see changes')
      } else {
        // Add a new property
        const propertyId = uuidv4();
        const propertyData = {
          id: propertyId,
          ProjectAmount: properties.Price,
          ProjectType: properties.ProjectType,
          ProjectName: properties.ProjectName,
          Service: properties.Service,
          Bedrooms: properties.Bedrooms,
          State: properties.State,
          About: properties.Description,
          ImagePath: properties.ImagePath,
          Location: properties.Locate,
          userId: user.uid,
        };
        await addProperty(propertyData, properties.imageFiles, properties.ImagePath);
        setSuccess('Property added successfully');
      }
  
      // Reset form fields
      setProperties({
        Price: '',
    ProjectType: '',
    ProjectAmount: '',
    ProjectName: '',
    Locate: '',
    Service: '',
    Bedrooms: '',
    State: '',
    Description:'',
    imageFiles: []
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting property:', error);
      setError('Error submitting property, please try again.');
      clearMessages()
    }finally {
      clearMessages();
    }
  };
  
//populate data of selected property back to the form
  const handleEdit = (property) => {
    setProperties({
      id: property.id,
      Price: property.ProjectAmount || '',
      ProjectType: property.ProjectType || '',
      ProjectAmount: property.ProjectAmount || '',
      ProjectName: property.ProjectName || '',
      Locate: property.Location || '',
      Service: property.Service || '',
      Bedrooms: property.Bedrooms || '',
      State: property.State || '',
      Description: property.About || '',
      imageFiles: [],
      ImagePath: property.ImagePath || ''
    });
    setIsEditing(true); //track editing to avoid conflicts
    formRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form
  };
  


  return (
    <div className="min-h-screen flex flex-col items-center bg-white text-gray-900 mb-12">
      <h1 className="text-2xl font-bold mb-6 mt-10">Hello </h1>
      <button 
        className="mb-6 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
        onClick={() => {
          signOut(auth);
          localStorage.removeItem('user');
          router.push('/Admin/Auth/SignIn');
        }}
      >
        Sign out
      </button>
      
      <div ref={formRef} className="bg-red-100 p-8 rounded-lg shadow-md w-full md:w-[34rem] lg:w-[40rem]">
        <h2 className="text-xl font-semibold mb-4">Add Properties</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Price:</label>
            <input 
              type="number"
              name='Price'
              value={properties.Price}
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              onChange={handleInput}
            />

            <label className="block text-red-900 mb-2">Project Name</label>
            <input 
              type="text"
              name='ProjectName'
              value={properties.ProjectName}
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Service:</label>
            <select
              name='Service'
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              value={properties.Service}
              onChange={handleInput}
            >
              <option value="">All</option>
              <option value="For sale">For Sale</option>
              <option value="For rent">For Rent</option>
            </select>
          </div>

          <div className='flex flex-col pb-8'>
            <label className="block text-red-900 mb-2">Property Type:</label>
                <input
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                  name='ProjectType'
                  value={properties.ProjectType}
                  onChange={handleInput}
                />
              </div>
            <div className='flex flex-col pb-8'>
                <label htmlFor="">Location</label>
                <input
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                  name='Locate'
                  value={properties.Locate}
                  onChange={handleInput}
                  />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Bedrooms:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((numBedrooms) => (
                <button key={numBedrooms}
                  type="button"
                  id='bed-btn'
                  className={`px-3 py-2 ${properties.Bedrooms === numBedrooms ? 'bg-red-300' : 'bg-red-200'} 
                  text-red-900 rounded hover:bg-red-300`}
                  onClick={() => selectBedroom(numBedrooms)}
                >
                  {numBedrooms}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Location:</label>
            <div className='flex flex-wrap'>
              {locations.map((state) => (
                <label className='mr-4 mb-2 text-red-900' key={state}>
                  <input
                    type='radio'
                    name='State'
                    value={state}
                    onChange={handleInput}
                    className="mr-2"
                    checked={properties.State === state}
                  />
                  {state}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Describe property:</label>
            <textarea
              name='Description'
              value={properties.Description}
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              onChange={handleInput}
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Upload Image:</label>
            <input
              name='file'
              type='file'
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              onChange={handleFileChange}
              multiple
            />

          <label className="block text-red-900 mb-2">Image Path:</label>
          <input
            name='ImagePath'
            placeholder='You can make this same as project name'
            type='text'
            value={properties.ImagePath}
            className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            onChange={handleInput}
            disabled={properties.imageFiles.length === 0} // Disable if no new images are being uploaded
          />
          </div>
           <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            {isEditing ? 'Update Property' : 'Add Property'}
          </button>
        </form>
        <div>{error? (
          <p>{error}</p>
        ): (
          <p></p>
        )
        }</div>
        <div>{sucess? (
          <p className='text-green-700'>{sucess}</p>
        ): (
          <p></p>
        )
        }</div>
      </div>
          <EditProperties onEdit={handleEdit} />
    </div>
  );
};

export default Page;