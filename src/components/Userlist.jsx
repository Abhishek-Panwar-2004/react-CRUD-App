import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../assets/loading';

function Userlist({ onDelete }) {
  const [users, setUsers] = useState([]);
  const[isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    // Fetch users from JSONPlaceholder API
      const fetchUsers = () => {
        setIsLoading(true)
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=>{
          setUsers(response.data)
          setIsLoading(false)
        })
        .catch((err)=>{
          alert(`Unable to get users because ${err}`)
          setIsLoading(false)
        })      
      }
      fetchUsers()
  }, []);

  return (
    <div>
      {isLoading ? (
      <Loading/>): 
      (
      <>
      <div className='flex w-full text-xl font-bold text-slate-100 border-solid justify-end'>
        <Link to="/create" className='flex px-4 py-2 rounded-lg bg-yellow-300 justify-center items-center mt-14 ml-96 mr-20 hover:bg-yellow-600 hover:text-slate-300'>Add User</Link>
      </div>
      <div className='ml-28'>
        <h1 className='flex w-80 px-8 rounded-xl tracking-wide items-center justify-center py-5 text-5xl font-bold ml-96 mb-2 text-teal-300 bg-cyan-700'>Users List</h1>
      </div>
      <table className='bg-slate-100 m-auto mt-12 border-solid border-2 border-black items-center text-lg font-semibold justify-center'>
        <thead className='border-solid border-2 border-black text-xl'>
          <tr>
            <th className='border-solid border-2 border-black px-3 py-2'>Name</th>
            <th className='border-solid border-2 border-black px-3 py-2'>Email</th>
            <th className='border-solid border-2 border-black px-3 py-2'>Phone</th>
            <th className='border-solid border-2 border-black px-3 py-2'>Edit</th>
            <th className='px-3 py-2'>Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='border-solid border-2 border-black'>
              <td className='border-solid border-2 border-black px-3 py-2'>{user.name}</td>
              <td className='border-solid border-2 border-black px-3 py-2'>{user.email}</td>
              <td className='border-solid border-2 border-black px-3 py-2'>{user.phone}</td>
              <td className='border-solid border-2 border-black px-3 py-2 hover:bg-green-300'>
                <Link to={`/edit/${user.id}`}>
                  <svg viewBox="0 0 24 24" fill="none"width={40} xmlns="http://www.w3.org/2000/svg" stroke="#19611e"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#29702a"></path> </g></svg>
                </Link>
              </td>
              <td className='px-3 py-2 hover:bg-red-400 cursor-pointer' onClick={onDelete}>
                  <svg viewBox="0 0 24 24" width={45} fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d41111"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#a00303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 12V17" stroke="#a00303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#a00303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#a00303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#a00303" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )
      }
    </div>
    
  );
}

export default Userlist;
