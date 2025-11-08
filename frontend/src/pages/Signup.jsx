import React from 'react'
import HalfScreenYellow from '../components/HalfScreenYellow'
import SignupForm from '../components/SignupForm';

const Signup = () => {
  
  return (
    <div style={styles.container}>
    {/* Yellow Half Screen */}
    <HalfScreenYellow />
    {/* Login Form */}
    <SignupForm />
  </div>
  );
};

const styles = {
  container: {
    display: 'flex',       // Arrange components side-by-side
    height: '100vh',       // Full viewport height
    //width: '100vw',        // Full viewport width
  },
};

export default Signup