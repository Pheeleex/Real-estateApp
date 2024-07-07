// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage"
import { Firestore, addDoc, collection, deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBMHHaZWy1oZhveAyoj-jQ0_yoKvnzop_c",

  authDomain: "oysterestate-d61f1.firebaseapp.com",

  projectId: "oysterestate-d61f1",

  storageBucket: "oysterestate-d61f1.appspot.com",

  messagingSenderId: "230142385987",

  appId: "1:230142385987:web:5a30b6e707a0ed8b9959f6"

};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp
export const auth = getAuth()
export const storage = getStorage(app)
export const db = getFirestore(app)



export const addProperty = async (property, imageFiles, ImagePath) => {
  try {
    const propertyRef = collection(db, 'Properties');

    // Remove imageFiles from property object
    const { imageFiles: removedImageFiles, ...propertyData } = property;

    // Add property data to Firestore
    const docRef = await addDoc(propertyRef, propertyData);

    // Upload images to storage with indexed names
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const storageRef = ref(storage, `${ImagePath}/${ImagePath}${i + 1}`);
      await uploadBytes(storageRef, file);
    }

    console.log('Property and images added successfully');
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};


export const deleteProperty = async(id, ImagePath, setProperties) => {
  try {
    await deleteDoc(doc(db, 'Properties', id))

    //Delete associated property image from firebase storage

    const imageListRef = ref(storage, `${ImagePath}/`)
    const imageList = await listAll(imageListRef)
    const deletePromises = imageList.items.map((item) => deleteObject(ref(storage, item.fullPath)));

    await Promise.all(deletePromises)

    setProperties((prevProperties) => prevProperties.filter((prop) => prop.id !== id))
    console.log(`Property with id ${id} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting property with id ${id}:`, error);
  }
}

export const updateProperty = async (propertyId, updatedData) => {
  try {
    console.log('Updating property with ID:', propertyId);
    console.log('Updated Data:', updatedData);

    const propertyRef = doc(db, 'Properties', propertyId);
    await updateDoc(propertyRef, updatedData);
    console.log('Property updated successfully', propertyId);
  } catch (error) {
    console.error('Error updating property: ', error);
    throw error; // Ensure the error is thrown to be caught in handleSubmit
  }
};


