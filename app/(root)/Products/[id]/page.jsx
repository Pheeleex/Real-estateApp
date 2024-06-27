// app/products/[id]/page.jsx

import React from 'react';
import propertiesLoader from '@/utils/propertiesLoader';
import Image from 'next/image';
import Link from 'next/link';
import CustomSlider from '@/Components/CustomSlider';
import '../products.css';

const page = async ({ params }) => {
  const properties = await propertiesLoader();
  const property = properties.find((prop) => prop.id === params.id);

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <section>
      <div className="property-details">
        <h1>{property.ProjectName}</h1>
        <p>Amount: ${property.ProjectAmount}</p>
        <p>Service: {property.Service}</p>
        <p>Type: {property.ProjectType}</p>
        <p>Bedrooms: {property.Bedroom}</p>

        <CustomSlider
          items={property.images}
          width={1000}
          height={775}
          slideContClass={'image-slide'}
          slideImgClass={'w-full h-full object-fit'}
        />

        <Link href="/products" className="btn">Back to Products</Link>
      </div>
    </section>
  );
};

export default page;
