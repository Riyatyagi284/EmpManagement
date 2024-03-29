import React, { useState } from 'react'
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import TabComponent from "./Tabs"


const Signup = () => {

  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: "",
  })

  const [accountType, setAccountType] = useState("Employee")

  const [registerUserData, setRegisterUserData] = useState(null);

  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/login")
  }

  const signUpInputHandler = (e) => {
    setSignUpInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const signUpSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', signUpInput.username);
      formData.append('password', signUpInput.password);
      formData.append("accountType", accountType);

      console.log("formData", formData);

      try {
        const { data } = await axios.post("http://localhost:3000/api/v1/auth/signup", formData);

        console.log("data", data);
        // setRegisterUserData(data);

        navigate("/login")

        setSignUpInput({
          username: "",
          password: "",
        });

      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        }
        console.log("error while submitting formData", error);
      }


    } catch (error) {
      console.log("error", error.response.data)
    }
  }

  return (
    <div className="w-full h-[100%] bg-gray-400 flex justify-center items-center">
      <div className="w-[60%] lg:w-[62%] h-[80%] flex flex-col lg:flex-row ">
        {/* Left part */}
        <div className="w-full lg:w-[50%] h-[40%] lg:h-full bg-red-500 rounded-tl-md rounded-bl-md flex justify-center items-center flex-col text-slate-300">
          <h2 className="w-40% text-center font-bold text-[2rem]">Welcome Back!!</h2>
          <p className='text-center font-bold text-[0.9rem] w-[70%] m-4'>To keep connected with us please login with your Personal Info.</p>
          <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500  font-bold' onClick={loginNavigate}>SignIn</button>
        </div>

        {/* Right part */}
        <div className="w-full lg:w-[50%] h-[60%] lg:h-full  bg-white rounded-br-md text-black flex pt-[2rem] lg:pt-0 gap-[0.7rem] lg:gap-0 justify-start lg:justify-center items-center flex-col">
          <h2 className="w-40% text-center font-bold text-[2rem]">Create Account</h2>

          <div className='flex justify-center items-center gap-2 my-3'>
            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaGoogle />
            </div>

            <div className='border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer' >
              <FaFacebookF />
            </div>
          </div>

          <p className='text-center font-semibold text-[1rem] w-[70%] text-gray-400'>or use your email for registration</p>

          <TabComponent setAccountType={setAccountType} accountType={accountType} />
          <form className='flex flex-col justify-center items-center w-full' onSubmit={signUpSubmitHandler}>

            <input type="text" name="username" value={signUpInput.username} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Username' required />

            <input type="password" name="password" value={signUpInput.password} onChange={signUpInputHandler} className="bg-gray-300 text-black py-[0.6rem]  px-[0.6rem] w-[70%] mt-2 mb-3 rounded-sm border-none outline-none" placeholder='Enter Password' required />

            <button className='border border-slate-300 border-bold rounded-full w-[8rem] h-auto p-[0.45rem] bg-red-500 text-slate-300 font-bold'>SignUp</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Signup
