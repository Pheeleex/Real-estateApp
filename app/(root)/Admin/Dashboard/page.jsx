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
import { Controller, useForm } from 'react-hook-form';

const Page = () => {
  const [user, loading] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  
  const router = useRouter();
  const formRef = useRef(null)

  //console.log(user)

  const {register,
       handleSubmit,
      formState: { errors, isSubmitting,},
      control,
      reset,
      setValue,
      getValues
    } = useForm({
      defaultValues:{
        Image: [],
      }
    })

    const handleEdit = (data) => {
      setValue('id', data.id);
      setValue('Price', data.ProjectAmount || '');
      setValue('ProjectType', data.ProjectType || '');
      setValue('ProjectName', data.ProjectName || '');
      setValue('Location', data.Location || '');
      setValue('Service', data.Service || '');
      setValue('Bedrooms', data.Bedrooms || '');
      setValue('State', data.State || '');
      setValue('About', data.About || '');
      setValue('imageFiles', []);
      setValue('ImagePath', data.ImagePath || '');
  
      setIsEditing(true);
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    };
   

   
    const onSubmit = (data, event) => { 
      const { ProjectName, ProjectType, ImagePath, Price, Service, Image, State } = data;
      if(!isEditing){
        try{
          console.log('edited data', data)
        }
        catch(error){
          console.log(error)
        }
      }
        if(isEditing){
          console.log('edited data', data)
        }
      reset()
    };

  useEffect(() => {
   if(!loading && !user){
    router.push('./Auth/SignIn')
   }  
  }, [loading, router, user]);

  const locations = ['Gold State', 'Blue State', 'Marquess State', 'Grey State'];

 
  

  


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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Price:</label>
            <input
               {...register("Price", { required: 'Price is required' })}
              type="number"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
              {errors.Price && (
                <p className="text-red-500">{errors.Price.message}</p>
              )}
            <label className="block text-red-900 mb-2">Project Name</label>
            <input
              {...register("ProjectName", {required: 'Project name is required'})}
              type="text"
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
            {errors.ProjectName && (
                <p className="text-red-500">{errors.ProjectName.message}</p>
              )}
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Service:</label>
            <Controller
              name="Service"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                >
                  <option value="">All</option>
                  <option value="For sale">For Sale</option>
                  <option value="For rent">For Rent</option>
                </select>
              )}
            />
          </div>

          <div className='flex flex-col pb-8'>
            <label className="block text-red-900 mb-2">Property Type:</label>
                <input
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                  {...register('ProjectType', {required: 'Project Type is required'})}
                />
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Bedrooms:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((option) => (
                <label className='mr-4 mb-2 text-red-900' key={option}>
                  <input
                    type="radio"
                    value={option}
                    {...register('Bedrooms')}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-red-900 mb-2">State:</label>
            <div className="flex flex-wrap">
              {locations.map((state) => (
                <label className='mr-4 mb-2 text-red-900' key={state}>
                  <input
                    type="radio"
                    value={state}
                    {...register('State')}
                    className="mr-2"
                  />
                  {state}
                </label>
              ))}
            </div>
          </div>
            <div className='flex flex-col pb-8'>
                <label htmlFor="">Location</label>
                <input
                  className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
                  {...register('Location', {required: 'Location is required'})}
                  />
          </div>
          
          
          <div className="mb-4">
            <label className="block text-red-900 mb-2">Describe property:</label>
            <textarea
              {...register('About', {required: 'Description is required'})}
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-4">
          <label className="block text-red-900 mb-2">Upload Image:</label>
            <input
              {...register('Image', )}
              type='file'
              name='Image'
              className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
              multiple
            />
            {errors.Image && (
              <p className="text-red-500">{errors.Image.message}</p>
            )}
          <label className="block text-red-900 mb-2">Image Path:</label>
          <input
            {...register('ImagePath', isEditing ? {} : {required: 'Image Path is required',
            })}
            placeholder='You can make this same as project name'
            type='text'
            className="w-full p-2 border border-red-300 rounded focus:outline-none focus:border-red-500"
          />
          {
            errors.ImagePath && (
              <p className="text-red-500">{errors.ImagePath.message}</p>
            )
          }
          </div>
           <button 
            type="submit"
            className={`text-white px-4 py-2 rounded hover:bg-red-600 
                ${isSubmitting ? 'bg-slate-500' : 'bg-red-500'}`}
            disabled={isSubmitting}
            >
            Submit
          </button>
        </form>
      </div>
          <EditProperties onEdit={handleEdit} />
    </div>
  );
};

export default Page;