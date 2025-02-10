import React from 'react';
// import './App.css';
import { useEffect } from 'react';
import { createBrowserRouter,  RouterProvider } from 'react-router-dom';
import EmailLogin from './User';
import Register from './CreateUser';
import GoogleSign from './GoogleSign';
import PaymentSuccess from './Success';
import PaymentFailure from './Failure';

function App() {

  const router = new createBrowserRouter([
    {
      path : "/",
      element: <EmailLogin />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
     path: '/influencer',
     element: <GoogleSign />  
    },
    {
      path: '/success',
      element: <PaymentSuccess />  
     },
     {
      path: '/failure',
      element: <PaymentFailure />  
     }

  ])


  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
      
  //     document.body.removeChild(script);
  //   };
  // }, []);

 



  return (
   <RouterProvider router={router} />
  );
}

export 

default App;