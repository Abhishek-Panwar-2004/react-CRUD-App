import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../assets/loading';

function Createuser({ onCreate }) {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });
  const[isLoading, setIsLoading] = useState(false)
  const[errormsg, setErrorMsg] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // POST request to create a new user
    try {
    setIsLoading(true)
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', user) 
    setIsLoading(false)
    onCreate(response.data);
    alert("New User Created")
    setUser({ name: '', email: '', phone: '' });
    } catch (err) {
        alert(`User not created because ${err}`)
        setIsLoading(false)
    }
  };

  return (
    <div>
      {isLoading ? (<Loading/>) : 
      (
      <form className='w-96 h-96 bg-slate-300 rounded-lg flex flex-col justify-center items-center mx-auto my-16 border-solid border-2 border-blue-500' onSubmit={handleSubmit}>
        <h2 className='mb-12 text-4xl font-bold text-blue-500'>Create User</h2>
        <input className='w-80 p-1 rounded-lg'
          required={true}
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
        <input className='w-80 p-1 my-6 rounded-lg'
          required={true}
          type="email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
        />
        <input className='w-80 p-1 rounded-lg border-solid border-l-sky-300'
          required={true}
          type="text"
          placeholder="Phone"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
        />
        <button disabled={isLoading} className='my-6 bg-green-500 py-2 px-4 rounded-xl hover:bg-green-700 text-white font-bold' type="submit">Create</button>

        <Link to="/" className='bg-yellow-500 px-4 py-2 rounded-xl text-white font-semibold hover:bg-amber-600'>Back to Users List</Link>
      </form>

      )}
    </div>
  );
}

export default Createuser;
