import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full h-full flex flex-col justify-center items-center font-bold text-[2rem]'>
            <p>Hello, This is home page </p>
            <button onClick={() => navigate("/signup")} className="bg-pink-300 py-[0.8rem] px-[2rem] text-[1.2rem] rounded-md">Signup</button>
        </div>
    )
}

export default Home
