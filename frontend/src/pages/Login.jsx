import React from 'react';
import Navbar from '../components/Navbar';
import Manager from '../components/Manager';
import Footer from '../components/Footer';
import CategoryBar from '../components/CategoryBar';
import HalfScreenYellow from '../components/HalfScreenYellow';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div style={styles.container}>
      {/* Yellow Half Screen */}
      <HalfScreenYellow />
      {/* Login Form */}
      <LoginForm />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',       // Arrange components side-by-side
    height: '100vh',       // Full viewport height
    width: '100vw',        // Full viewport width
  },
};

export default Login;
