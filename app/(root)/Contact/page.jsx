import React from 'react'
import './Contact.css'

const page = () => {
  return (
    <section className="contact">
      <div className="contact-form">
        <div className="text-form">
          <h2 className="text-3xl font-bold mb-4">Get in touch</h2>
          <p className="text-red-700 mb-4">
            Welcome! We are delighted that you're interested in getting in touch
            with us. Please fill out the contact form below, and we will respond
            to you as soon as possible. We look forward to hearing from you!
          </p>
        </div>
        <form className="grid-form p-2 pt-8">
          <div className="forms">
            <label htmlFor="firstname" 
              className="block text-lg font-medium">
                First name
            </label>
            <input 
              type="text" 
              id="firstname" 
              name="firstname" 
              />
          </div>

          <div className="forms">
            <label htmlFor="lastname" 
             className="block text-lg font-medium"
            >Last name</label>
            <input type="text" id="lastname" 
              name="lastname" 
           />
          </div>

          <div className="forms">
            <label htmlFor="email"
               className="block text-lg font-medium"
             >Email Address</label>
            <input type="email" 
              id="email" 
              name="email" 
             />
          </div>

          <div className="forms col-span-1 md:col-span-2">
            <label htmlFor="message"
              className="block text-lg font-medium"
             >Message</label>
            <textarea id="message" name="message" rows="4"
             className="mt-1 p-2 w-full submit"></textarea>
          </div>

          <div className="cbox">
            <input type="checkbox" 
                id="check" 
                name="check" 
           />
            <label htmlFor="check" className="myCheckBox">I have read, understood and agreed with the privacy policies</label>
          </div>
          
          <button id="submit-btn">Submit</button>
        </form>
      </div>
      <div className="locate">
        <div className="map-box">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.885557362858!2d8.5386682!3d7.6954294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105a7f863910fae5%3A0x2082b793098eb085!2sBrothers%20FM!5e0!3m2!1sen!2sng!4v1687431393116!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
            aria-hidden="false"
          ></iframe>
        </div>
        <div className="contact-info">
          <h3 className="text-xl font-semibold">Contacts</h3>
          <p>investor.services@Oysterpg.org</p>
          <p>+44 0203 858 9881</p>
        </div>
      </div>
    </section>
  )
}

export default page