import React, { useRef } from 'react';
import Navbar from '../components/HomeNav';
import '../styles/Home.css';

const Home = () => {
  const peopleRef = useRef(null);
  const insightsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans">
      <Navbar scrollToSection={scrollToSection} refs={{ peopleRef, insightsRef, contactRef }} />

      <section className="h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-yellow-500">VJTI OLX</span>
        </h1>
        <p className="text-xl text-gray-600">Buy, Sell, and Connect with ease</p>
      </section>

      <section ref={peopleRef} className="h-screen bg-blue-50 flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Meet the VJTI Community</h2>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          We're a passionate group of innovators dedicated to building cutting-edge web solutions. Our goal is to create visually stunning, user-friendly websites that enhance the online experience.
        </p>
        <div className="mt-4 text-blue-800 font-medium">
          <p className='text-blue-950 font-bold text-2xl'>OUR TEAM</p>
          <p>Samiksha Navale</p>
          <p>Aditya Pawar</p>
          <p>Harshada Khanjode</p>
          <p>Tithee Upase</p>
          <p className='text-blue-950 font-bold text-2xl'>MENTORS</p>
          <p>Aditya Shintre</p>
          <p>Subodh Salgaonkar</p>
          <p>Soham Potharkar</p>


        </div>
      </section>

      <section ref={insightsRef} className="h-screen bg-green-50 flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Platform Insights</h2>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          Discover the latest trends within the VJTI community. See what's trending, explore unique finds, and learn how we're fostering a sustainable campus ecosystem through VJTI-OLX.
        </p>
      </section>

      <section ref={contactRef} className="h-screen bg-yellow-50 flex flex-col items-center justify-center px-6">
        <h2 className="text-4xl font-bold text-yellow-700 mb-4">Get in Touch</h2>
        <p className="text-lg text-gray-700 max-w-2xl text-center">
          We'd love to hear from you! Share your questions, feedback, or ideas, and let's make VJTI-OLX even better together.
          <div className="mt-4 text-blue-800 font-medium">
          <p className='text-blue-950 font-bold text-2xl'>Contact us</p>
          <p>samikshanavale43@gmail.com</p>
        

        </div>
        </p>
      </section>
    </div>
  );
};

export default Home;
