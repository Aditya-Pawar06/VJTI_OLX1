import React from "react";
<q></q>
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Marketplace from './pages/Marketplace';
import ProductInfo from './pages/ProductInfo'

function App() {
  // Define routes for your app
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, // Home page
    },
    {
      path: "/signup",
      element: <Signup />, // Signup page
    },
    {
      path: "/login",
      element: <Login />, // Login page
    },
    {
      path: "/profile",
      element: <Profile />, // Profile page
    },
    {
      path: "/marketplace",
      element: <Marketplace />, // Marketplace page
    },
    {
      path: "/product/:id",
      element: <ProductInfo />, // ProductInfo page
    },
  ]);

  return (
    <RouterProvider router={router} /> // Pass the router to RouterProvider
  );
}

export default App;
