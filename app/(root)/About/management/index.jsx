import React from 'react';
import '../About.css'
import ManagementCard from './ManagementCard';

const Management = () => {
   
  return (
    <section className="about-management">
      <h2 className="service-head">
        Senior Management</h2>
      <div className="line" />
          <ManagementCard
          />
    </section>
  )
}

export default Management