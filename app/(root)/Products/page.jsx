import Link from 'next/link';
import CustomSlider from '@/Components/CustomSlider';
import SearchBar from '@/Components/SearchBar';
import propertiesLoader from '@/utils/propertiesLoader';
import './products.css';

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
  console.log('Filtered by Service:', filteredProperties);
}

if (searchParams.query) {
  filteredProperties = filteredProperties.filter((property) =>
    property.Location.toLowerCase().includes(searchParams.query.toLowerCase())
  );
  console.log('Filtered by query:', filteredProperties, 'query');
}

if (searchParams.Bedroom) {
  filteredProperties = filteredProperties.filter((property) =>
    property.Bedroom == searchParams.Bedroom
  );
  console.log('Filtered by Bedroom:', filteredProperties);
}

if (searchParams.State) {
  filteredProperties = filteredProperties.filter((property) =>
    property.State.toLowerCase().includes(searchParams.State.toLowerCase())
  );
  console.log('Filtered by State:', filteredProperties);
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
      <section className='relative w-full'>
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center mt-16">
          <div className="text-overlay p-4 top-[40%] border rounded-lg">
            <h2>Our Current Products</h2>
          </div>
        </div>
        <SearchBar properties={properties} />
      </section>
      <section className='projects'>
        {renderedProperties.map((prop) => (
          <div key={prop.id} className="products-slide">
            <div className="bucket">
              <div className="features">
                <div className='name-amount'>
                  <h2>{prop.ProjectName}</h2>
                  <h3>${prop.ProjectAmount}</h3>
                </div>
                <div className='service-type'>
                  <h3>{prop.Service}</h3>
                  <p>{prop.ProjectType}</p>
                </div>
                <span>{prop.Bedroom} {prop.Bedroom === 1 ? 'Bedroom' : "Bedrooms"}</span>
                <Link href={`/Products/${prop.id}`} className="btn">Find Out More</Link>
              </div>
            </div>
            {prop.images && prop.images.length > 0 ? (
              <CustomSlider
                items={prop.images}
                width={560}
                height={500}
                slideContClass='image-slide'
                slideImgClass='w-full h-full object-fit'
                largeCont=''
              />
            ) : (
              <p>No images available</p>
            )}
          </div> 
        ))}
      </section>
    </>
  );
};

export default ProductsPage;
