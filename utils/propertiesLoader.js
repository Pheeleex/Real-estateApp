import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref, listAll } from 'firebase/storage';
import { db, storage } from './Firebase';

const fetchProperties = async () => {
  try {
    const propertyCollectionRef = collection(db, 'Properties');
    const orderedQuery = query(propertyCollectionRef, orderBy('id'));
    const querySnapshot = await getDocs(orderedQuery);
    const propertyData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const propertiesWithImages = await Promise.all(propertyData.map(async (property) => {
      let images = [];
      const imagePath = property.ImagePath || property.id;  // Check for imagePath, default to property.id if not available
      const imageListRef = ref(storage, `${imagePath}/`);
      

      try {
        const imageList = await listAll(imageListRef);
        images = await Promise.all(imageList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return url;
        }));
      } catch (error) {
        console.error(`Error fetching images for property ${property.id}:`, error);
      }

      return { ...property, images };
    }));

    
   
    return propertiesWithImages;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export default fetchProperties;
