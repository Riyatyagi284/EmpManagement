import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ValidationError = ({ message }) => {
    return message && <p className="text-red-500 text-sm">{message}</p>;
};


const EditModal = ({ id, setShowModal, setEditEmpData }) => {
    const [validationErrors, setValidationErrors] = useState({});
    // const [editEmployeeData, setEditEmployeeData] = useState(null)

    const [formData, setFormData] = useState({
        name: "",
        branch: "",
        phone: "",
        email: ""
    })

    const editChangeHandler = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }



    const getSubmitData = async (event, id) => {
        event.preventDefault();

        const errors = {};
        if (!formData.name) {
            errors.name = 'Name is required.';
        }
        if (!formData.branch) {
            errors.branch = 'Branch is required.';
        }
        if (!formData.phone) {
            errors.phone = 'Phone is required.';
        }
        if (!formData.email) {
            errors.email = 'Email is required.';
        }

        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Edit formData", formData);

            try {

                try {
                    const { data } = await axios.post("http://localhost:3000/api/v1/auth/editEmployee", {
                        ...formData,
                        id: id // Include the id in the request body
                    });

                    console.log("editdata", data);
                    // setEditEmployeeData(data);

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

            setShowModal(false);
        }

        setFormData(null);
        setShowModal(false);
    };


    const handleCloseModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                            <h3 className="text-3xl font=semibold">Edit Employee</h3>
                            <button
                                className="bg-transparent border-0 text-black float-right"
                                onClick={handleCloseModal}
                            >
                                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                    x
                                </span>
                            </button>
                        </div>


                        <div className="relative p-6 flex-auto">

                            <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" >
                                <label className="block text-black text-sm font-bold mb-1">
                                    Name
                                </label>
                                <textarea required className="shadow appearance-none border rounded w-full py-2 px-1 text-black" rows="2" cols="12" onChange={editChangeHandler} name="name" value={formData?.name || ""}></textarea>

                                <ValidationError message={validationErrors.name} />



                                <label className="block text-black text-sm font-bold mb-1">
                                    Branch
                                </label>
                                <input required className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="branch" value={formData?.branch || ""} onChange={editChangeHandler} />

                                <ValidationError message={validationErrors.branch} />


                                <label className="block text-black text-sm font-bold mb-1">
                                    Phone Number
                                </label>
                                <input required type="number" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="phone" value={formData?.phone || ""} onChange={editChangeHandler} />

                                <ValidationError message={validationErrors.phone} />

                                <label className="block text-black text-sm font-bold mb-1">
                                    Email
                                </label>
                                <input required type="email" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" name="email" value={formData?.email || ""} onChange={editChangeHandler} />

                                <ValidationError message={validationErrors.email} />

                                <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-gray-300 font-bold uppercase px-[2rem] py-[0.8rem] rounded-md text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>

                                    <button
                                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={(event) => getSubmitData(event, id)}
                                    >
                                        Update
                                    </button>

                                </div>


                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditModal;