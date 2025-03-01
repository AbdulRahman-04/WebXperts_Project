import React from 'react';
import webXpertz from "../../assets/og_webxpertz.png";

const Signin = () => {
  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center px-4'>
      <div className='bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 w-full max-w-md flex flex-col items-center shadow-lg'>
        
        <img src={webXpertz} alt='webXpertz Logo' className='w-34 h-34 mb-6' />
        
        <h3 className='text-white font-semibold text-2xl mb-4 text-center'>Sign in to WebXpertz</h3>
        
        <div className='w-full'>
          <label className='text-white font-medium'>Email</label>
          <input type='text' className='text-white border-2 w-full mt-2 p-2 rounded-lg border-gray-600 bg-gray-700' placeholder='Enter your email...' />
        </div>
        
        <div className='w-full mt-4'>
          <label className='text-white font-medium'>Password</label>
          <input type='password' className='text-white border-2 w-full mt-2 p-2 rounded-lg border-gray-600 bg-gray-700' placeholder='Enter your password...' />
        </div>
        
        <button type='button' className='mt-6 w-full h-10 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition'>Sign In</button>
        
        <h5 className='text-white mt-4 text-center'>
          Don't have an account? <a href='#' className='text-blue-500 underline'>Sign up here!</a>
        </h5>
      </div>
    </div>
  );
};

export default Signin;