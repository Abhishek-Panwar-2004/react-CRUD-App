import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../assets/loading';

function Edituser({ onUpdate }) {
    const navigate= useNavigate()
    const { userId } = useParams();
    const [editedUser, setEditedUser] = useState({ name: '', email: '', phone: '' });
    const[isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // Fetch user details based on userId
        setIsLoading(true)
        axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`).then((response)=> {
        setEditedUser(response.data)
        setIsLoading(false)
        }) 
        .catch((err)=> {
            alert(`ERROR! ${err}`)
            setIsLoading(false)
        })
       }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // PUT request to update user data
        try {
            setIsLoading(true)
            const response= await axios.put(`https://jsonplaceholder.typicode.com/users/${editedUser.id}`,editedUser)
            onUpdate(response.data)
            setIsLoading(false)
            alert("User Updated")
            navigate('/')
            } catch (err) {
            alert(`User not updated because ${err}`)
            setIsLoading(false)
        }
    };

    return (
        <div>
            {isLoading ? (<Loading/>): (
            <form className='w-96 h-96 bg-slate-300 rounded-lg flex flex-col justify-center items-center mx-auto my-16 border-solid border-2 border-blue-500' onSubmit={handleSubmit}>
                <h2 className='mb-12 text-4xl font-bold text-green-500'>Edit User</h2>
                <input className='w-80 p-1 rounded-lg'
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                />
                <input className='w-80 p-1 my-6 rounded-lg'
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                />
                <input className='w-80 p-1 rounded-lg border-solid border-l-sky-300'
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                />
                <button disabled={isLoading} className='my-6 bg-green-500 py-2 px-4 rounded-xl hover:bg-green-700 text-white font-bold'  type="submit">Update</button>
            </form>
            )}
        </div>
    );
}

export default Edituser;
