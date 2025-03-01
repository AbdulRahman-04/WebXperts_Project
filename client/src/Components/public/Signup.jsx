import React from 'react';

const Signup = () => {
  return (
    <div className='bg-gray-900 min-h-screen flex items-center justify-center px-4'>
      <div className='border-3 border-blue-800 rounded-2xl p-8 w-full max-w-md flex flex-col items-center'>
        <h3 className='text-white font-semibold text-2xl text-center'>Create an Account</h3>
        
        <div className='w-full mt-6'>
          <label className='text-white font-semibold'>Email</label>
          <input type='text' className='text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800' placeholder='Enter Your Email..' />
        </div>
        
        <div className='w-full mt-4'>
          <label className='text-white font-semibold'>Password</label>
          <input type='password' className='text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800' placeholder='Enter Password..' />
        </div>
        
        <div className='w-full mt-4'>
          <label className='text-white font-semibold'>Phone Number</label>
          <input type='number' className='text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800' placeholder='Enter Your Mobile Number..' />
        </div>

        <button type='button' className='mt-6 w-full h-10 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition'>Sign Up</button>

        <h5 className='text-white mt-4 text-center'>
          Already have an account? <a href='#' className='text-blue-600 underline'>Signin Here!</a>
        </h5>
      </div>
    </div>
  );
};

export default Signup;