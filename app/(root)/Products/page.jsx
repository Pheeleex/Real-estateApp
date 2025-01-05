import Link from 'next/link';
import CustomSlider from '@/Components/CustomSlider';
import SearchBar from '@/Components/SearchBar';
import propertiesLoader from '@/utils/propertiesLoader';
import './products.css';
import { ArrowRight } from 'lucide-react';

const ProductsPage = async ({ searchParams }) => {
  /*pull properties from properties loader(ssr) and filter with 
  search params if any*/
  const properties = await propertiesLoader({ query: searchParams?.query || '',
    Service: searchParams?.Service || '',
    minPrice: searchParams?.minPrice || '',
    maxPrice: searchParams?.maxPrice || '',
    Bedroom: searchParams.Bedroom || '',
    State: searchParams?.State || ''
   });
  console.log(searchParams, 'lets see')

 // Initialize filteredProperties with all properties
 let filteredProperties = properties;

// Apply filters based on searchParams
if (searchParams.Service) {
  filteredProperties = filteredProperties.filter((property) =>
    property.Service === searchParams.Service
  );
}

if (searchParams.query) {
  filteredProperties = filteredProperties.filter((property) =>
    property.Location.toLowerCase().includes(searchParams.query.toLowerCase())
  );
}

if (searchParams.Bedroom) {
  filteredProperties = filteredProperties.filter((property) =>
    property.Bedroom == searchParams.Bedroom
  );
}

if (searchParams.State) {
  filteredProperties = filteredProperties.filter((property) =>
    property.State.toLowerCase().includes(searchParams.State.toLowerCase())
  );
}

if (searchParams.minPrice) {
  filteredProperties = filteredProperties.filter((property) =>
    property.ProjectAmount >= parseFloat(searchParams.minPrice)
  );
}

if (searchParams.maxPrice) {
  filteredProperties = filteredProperties.filter((property) =>
    property.ProjectAmount <= parseFloat(searchParams.maxPrice)
  );
}

//if there are no corresponding properties to the 
//users filters, alert the user
const renderedProperties = filteredProperties.length > 0 ? filteredProperties :
  [{ id: 'none', ProjectName: 'No property found' }];
 
console.log(searchParams, searchParams.Service, renderedProperties.length)

  return (
    <>
      <section className='w-full'>
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center mt-16">
          <div className="text-overlay p-4 top-[40%] border rounded-lg">
            <h2>Our Current Products</h2>
          </div>
        </div>
        <div>
          <SearchBar properties={properties} />
        </div>
      </section>
      <section className='projects'>
        {renderedProperties.map((prop) => (
          <div key={prop.id} className="products-slide min-h-[350px] max-h-[380px]">
               {prop.images && prop.images.length > 0 ? (
              <CustomSlider
                items={prop.images}
                width={500}
                height={500}
                slideContClass='image-slide'
                slideImgClass='w-full h-full object-fit'
                largeCont=''
              />
            ) : (
              <p>No images available</p>
            )}
            <div className="bucket">
              <div className="features">
                <div className='name-amount'>
                  <h4 className='text-md md:text-4xl'>{prop.ProjectName}</h4>
                  <h4>${prop.ProjectAmount}</h4>
                </div>
                <div className='service-type'>
                  <h3 className='text-md '>{prop.Service}</h3>
                  <p>{prop.ProjectType}</p>
                </div>
                <span>{prop.Bedroom} {prop.Bedroom === 1 ? 'Bedroom' : "Bedrooms"}</span>
                <Link href={`/Products/${prop.id}`} className="flex justify-center items-center text-red-800">
                    <span>Find Out More</span>
                    <ArrowRight className="icon" />
                </Link>
              </div>
            </div>
           
          </div> 
        ))}
      </section>
    </>
  );
};

export default ProductsPage;
