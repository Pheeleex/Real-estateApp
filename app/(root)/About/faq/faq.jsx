"use client"

import React, { useState } from 'react';
const AccordionItem = ({ index, question, answer, activeIndex, handleAccordionClick }) => {
  const isActive = activeIndex === index;
  const panelId = `panel-${index}`;
  const buttonId = `button-${index}`;

  return (
    <div className="accordion-item">
      <button
        id={buttonId}
        className={`accordion ${isActive ? 'active' : ''}`}
        onClick={() => handleAccordionClick(index)}
        aria-expanded={isActive}
        aria-controls={panelId}
      >
        {question}
      </button>
      <div id={panelId} className={`panel ${isActive ? 'activated' : ''}`} aria-labelledby={buttonId}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

// Accordion component
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqData = [
    {
      question: "Who is the Oyster Property Group?",
      answer: "Oyster Property Group is an independent development and regeneration specialist that has been creating residential-led refurbishment and new build schemes for many years."
    },
    {
      question: "What is Oyster Property Invest?",
      answer: "Oyster Property Invest is the fundraising arm of Oyster Property Group. They offer investors a platform to invest in the UK property market, providing a fixed-term investment with either regular, fixed income or capital growth."
    },
    {
      question: "How can I get in touch?",
      answer: "If you have any questions or would like to learn more about Oyster Property Invest, you can reach us at:"
    }
  ];

  return (
    <section className="freq-asked">
      <div className="fa-cont">
        <h3>Frequently asked questions</h3>
        <p>Curious about becoming a property development investor? Get the answers you need with your questions tackled.</p>
      </div>
      <div className="faq">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
            activeIndex={activeIndex}
            handleAccordionClick={handleAccordionClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
