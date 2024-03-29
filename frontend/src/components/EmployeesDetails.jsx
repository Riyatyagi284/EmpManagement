import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { empHeadData, empBodyData } from "../data.js"
// import { empHeadData } from "../data.js"
import EditModal from './EditModal';
import CreateModal from "./CreateModal"


const EmployeesDetails = () => {
  const [tableHeadData, setTableHeadData] = useState(empHeadData);
  const [tableBodyData, setTableBodyData] = useState(null);
  const [editEmpData, setEditEmpData] = useState({ title: "", taskType: "", dueTime: "" });
  const [editTaskId, setEditTaskId] = useState(null)

  // const [filteredBodyData, setFilteredBodyData] = useState(empBodyData)

  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployeesData()
  }, [])

  const fetchEmployeesData = async () => {
    try {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/auth/getAllEmployee");

        console.log("data", data);
        setTableBodyData(data);

        // setSignUpInput({
        //   username: "",
        //   password: "",
        // });

      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        }
        console.log("error while fetching employeeData", error);
      }
    } catch (error) {
      console.log("error", error.response.data)
    }
  }






  const searchHandlerInput = (e) => {
    console.log("searchHandler", e.target.value);
    setSearch(e.target.value)
  }


  // const getEditableTaskData = (id) => {
  //     setEditTaskId(id);
  // }

  const editBtnHandler = (id) => {
    console.log("editId", id)
    setShowModal(true)
    setEditTaskId(id);
  }

  const createEmployeeHandler = () => {
    setShowCreateModal(true)
  }


  const deleteBtnHandler = async (id) => {
    console.log("deleteId", id);

    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/auth/deleteEmployee`, {
        data: { id }
      });

      if (response.status === 200) {
        console.log("Employee deleted successfully:", response.data);
        alert("Employee deleted successfully");

      } else {
        console.error("Error deleting employee:", response.data.message);
        alert(response.data.message);

      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert(error)

    }
  };





  return (
    <div className="w-full h-full bg-gray-300">
      <div className="w-11/12 mx-auto bg-gray-300">

        <div className='flex justify-between items-center'>
          <h1 className="text-[1.77rem] text-black my-[1rem]">Employee Data</h1>

          <button className='bg-blue-400 py-[0.8rem] px-[1rem] text-[1rem] font-bold w-[10rem] rounded-md text-white' onClick={createEmployeeHandler}>Add</button>
        </div>

        <div className='bg-slate-200 py-2 px-6 w-full rounded-md'>
          <div className='w-full py-4'>
            <input type="search" value={search} onChange={searchHandlerInput} placeholder="Search Employee" className='w-3/12 py-4 px-4 rounded-md outline-none border-none text-[1rem]' />
          </div>

          <div className="relative overflow-x-auto shadow-md w-full">

            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr className="border-b border-r border-l border-t  ">
                  {tableHeadData.map((header, id) => (
                    <th key={id} className="px-6 py-3 border-r border-gray-300 w-auto">{header.data}</th>
                  ))}
                </tr>
              </thead>
              <tbody>


                {
                  tableBodyData?.employees.map((singledata) => (
                    // console.log("employees.map", singledata)
                    <tr className="bg-white border-b border-r border-l border-t ">
                      <td key={singledata._id} className="px-6 py-4 font-medium text-gray-900 ">{singledata.name}</td>
                      <td key={singledata._id} className="px-6 py-4 font-medium text-gray-900 ">{singledata.branch}</td>
                      <td key={singledata._id} className="px-6 py-4 font-medium text-gray-900 ">{singledata.phone}</td>
                      <td key={singledata._id} className="px-6 py-4 font-medium text-gray-900 ">{singledata.email}</td>
                      {/* <td key={singledata._id} className="px-6 py-4 font-medium text-gray-900 ">{singledata}</td> */}

                      < td >
                        <button className='text-blue-500 underline font-bold hover:font-bold hover:text-green-700 focus:outline-none' onClick={() => editBtnHandler(singledata._id, singledata)}>Edit</button> {"  / "}
                        < button className='text-blue-500 underline font-bold hover:font-bold hover:text-red-700 focus:outline-none' onClick={() => deleteBtnHandler(singledata._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }


              </tbody >
            </table >


            {
              showModal && (<EditModal setShowModal={setShowModal} id={editTaskId} setEditEmpData={setEditEmpData} />)
            }

            {
              showCreateModal && (<CreateModal setShowModal={setShowCreateModal} />)
            }

          </div >
        </div>

      </div>
    </div>
  )
}

export default EmployeesDetails;

