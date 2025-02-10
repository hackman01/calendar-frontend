import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import axios from 'axios';
import CreateEvent from './CreateEvent';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [user,setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/create-user',{email,name}).then((response)=>{
        setUser(response.data);
    }).catch((error)=>{
       console.log(error);
    })
    console.log('Login attempted with:', email);
  };

  return (
    <>
    {user ? (<CreateEvent user={user} />) : (<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Please enter your email and name to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="name" className="sr-only">
             Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              required
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-blue-300" />
              </span>
              Continue with Email
            </button>
          </div>
        </form>
      </div>
    </div>)}
  
  </>
)};

export default Register;