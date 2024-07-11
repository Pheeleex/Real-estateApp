'use client'
import { SquareX } from 'lucide-react'
import React, { useState } from 'react'
import './filters.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import PropTypes from 'prop-types';
import { formUrlQuery } from '@/utils/formQuery'

const Filters = ({ close, showFilter }) => {

  const searchParams = useSearchParams()

  const [filterForm, setFilterForm] = useState({
    Service: searchParams.get('Service') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    Bedroom: searchParams.get('Bedroom') || '',
    State: searchParams.get('State') || ''
  });

  const locations = ['Gold State', 'Blue State', 'Marquess State', 'Grey State'];

  const router = useRouter();
  const pathname = usePathname();

  //Add newurl if there is a filer value based on its name,
  //else return default url
  const updateUrl = (name, value) => {
    try {
      let newUrl = '';

      if (value) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: name,
          value: value,
        });
      } else {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          keysToRemove: [name],
        });
      }

      if (newUrl) {
        router.push(`${pathname}${newUrl}`, { scroll: false });
      } else {
        router.push(`/`, { scroll: false });
      }
    } catch (error) {
      console.error("Failed to update URL with search query", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterForm((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));

    updateUrl(name, value);
  };


  const selectBedroom = (name, value) => {
    setFilterForm((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? '' : value
    }));
    updateUrl(name, filterForm[name] === value ? '' : value);
  };

//clear form when reset button is clicked
  const handleReset = () => {
    setFilterForm({
      Service: '',
      minPrice: '',
      maxPrice: '',
      Bedroom: '',
      State: ''
    });
    close();
    router.push('/Products');
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filterForm, 'filter');
    close();
  };

  return (
    <form onSubmit={handleSubmit} className={`slide-form ${!showFilter ? 'inactive' : ''}`}>
      <div className='filter-top'>
        <h1>Filters</h1>
        <SquareX className='close' onClick={close} />
      </div>
      <div className='flex flex-wrap gap-8'>
        <div>
          <label>
            Property Type:
            <select
              name='Service'
              value={filterForm.Service}
              onChange={handleInputChange}
              className='w-[3rem]'
            >
              <option value="">All</option>
              <option value="For sale">For Sale</option>
              <option value="For rent">For Rent</option>
            </select>
          </label>
        </div>
        <div>
          <label>Min Price:</label>
          <input 
            type="number"
            name='minPrice'
            value={filterForm.minPrice}
            onChange={handleInputChange} />
        </div>
        <div>
          <label>Max Price:</label>
          <input type="number"
            name='maxPrice'
            value={filterForm.maxPrice}
            onChange={handleInputChange} />
        </div>
      </div>
      <div>
        <label>Bedrooms:</label>
        <div>
          {[1, 2, 3, 4].map((numBedrooms) => (
            <button key={numBedrooms} 
              type="button" 
              id='bed-btn'
              onClick={() => selectBedroom('Bedroom', numBedrooms)}
              className={numBedrooms === filterForm.Bedroom ? 'selected' : ''}>
              {numBedrooms}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label>Location:</label>
        <div className='radio-buttons'>
          {locations.map((state) => (
            <label className='radio-label' key={state}>
              <input
                type='radio'
                name='State'
                value={state}
                onChange={handleInputChange}
                checked={filterForm.State === state}
              />
              {state}
            </label>
          ))}
        </div>
      </div>
      <div>
        <button type='submit' className='apply'>Apply</button>
        <button type='button' className='apply' onClick={handleReset}>Reset</button>
      </div>
    </form>
  )
}

Filters.propTypes = {
  close: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
  properties: PropTypes.array.isRequired,
};

Filters.defaultProps = {
  properties: [],
};

export default Filters;
