import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleSign = () => {

    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
          console.log('Access Token:', tokenResponse);
          axios.post('http://localhost:8000/api/influencer/create-influencer',{code : tokenResponse.code}).then((response)=>{
            console.log(response);
            // setUser(response.data);
            navigate('/');
          }).catch((error)=>{
            console.log(error);
          })
        },
        onError: error => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/calendar',
        flow:'auth-code'
      });

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg  text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
          alt="Google Calendar"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-800">Google Calendar</h1>
        <p className="text-gray-600 mt-2">
          Sign in to access your Google Calendar events seamlessly.
        </p>

        <button
          onClick={login}
          className="mt-6 px-6 py-3 bg-blue-600 text-white flex items-center gap-2 rounded-lg hover:bg-blue-700 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>
      </div>
    </div>


  )
}

export default GoogleSign
