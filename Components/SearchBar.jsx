'use client'
import { Filter, Search } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Filters from './Filters';  
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { updateUrlWithSearchQuery } from '@/utils/formQuery';
import PropTypes from 'prop-types';


const SearchBar = ({ properties }) => {
  const [showFilter, setShowFilter] = useState(false);  // State to control the filter popup
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false); // State to control showing the results

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resultsRef = useRef()

  const filteredProperties = properties ? properties.filter((item) =>
    item.Location.toLowerCase().replace(/\s+/g, "").includes(search.toLowerCase().replace(/\s+/g, ""))
  ) : []

  const handleChange = (event) => {
    setSearch(event.target.value);
    setShowResults(true); // Show results when typing
  };

  const handleResultClick = (result) => {
    setSearch(result.Location);
    setShowResults(false); // Hide results when an item is clicked
    updateUrlWithSearchQuery(router, pathname, searchParams, result.Location)
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter
      setShowResults(false); // Hide results when Enter is pressed
      updateUrlWithSearchQuery(router, pathname, searchParams, search)
    }
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
  return (
    <div className='relative mt-4'>
      <div className='flex flex-col justify-center items-center absolute top-[90%] left-[4%] w-full'>
        <form className='flex flex-row justify-center items-center w-1/2'>
          <div className='flex items-center justify-center border p-2 w-full rounded-lg bg-white border-red-400'>
            <input
              type='text'
              placeholder='location'
              aria-label='Search location'
              value={search}
              onChange={handleChange}
              onFocus={() => setShowResults(true)} // Show results on focus
              
              onKeyPress={handleKeyPress} // Handle Enter key
              className='border-none outline-none w-full p-2 bg-transparent'
            />
            <div className='text-gray-400'>
              <Search color='pink' />
            </div>
          </div>
          <button
            type='button'
            className='bg-red-800 text-black p-2 ml-4 border rounded font-bold max-w-xs w-[10rem]'
            onClick={() => setShowFilter(true)} // Show filter on click
          >
           <div className='flex p-2 text-white'> <Filter /> Filter</div>
          </button>
        </form>
        {showResults && filteredProperties.length !== 0 && (
          <div className='data-results' ref={resultsRef}>
            {filteredProperties.slice(0, 4).map((prop) => (
              <div key={prop.id} className='location' onClick={() => handleResultClick(prop)}>
                <p className='data-item'><i className="bi bi-geo-alt locate"></i>{prop.Location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {showFilter && <Filters 
                          close={()=> {setShowFilter(false)}} 
                          showFilter={showFilter} 
                          properties={properties}
                          searchParams={searchParams}
                          />}
      {showFilter && <div className="overlay" onClick={() => setShowFilter(false)}></div>} {/* Overlay */}
    </div>
  );
};

SearchBar.PropTypes = {
  properties: PropTypes.array.isRequired,
};

SearchBar.defaultProps = {
  properties: [],
};


export default SearchBar;