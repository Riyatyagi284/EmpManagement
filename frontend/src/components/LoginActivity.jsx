import React, { useEffect, useState } from "react";
import { logHeadDetails, logBodyDetails } from "../data";
import axios from "axios";
import  convertDate  from "../utils/convertData";

const LoginActivity = () => {
  const [users, setusers] = useState([]);
  const [error, setError] = useState(null);

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/auth/allLoginActivity",
        { withCredentials: true }
      );
      if (data.success) {
        setusers(data.user);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Not Authorised");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="w-11/12  mx-auto">
      <h1 className="text-center my-10 text-2xl capitalize">
        user Activity Log
      </h1>
      <div className="relative overflow-x-auto shadow-md w-full pb-16">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="border-b border-r border-l border-t  ">
              {logHeadDetails.map((header, id) => (
                <th
                  key={id}
                  className="px-6 py-3 border-r border-gray-300 w-auto"
                >
                  {header.data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b border-r border-l border-t "
              >
                <td className="px-6 py-4 font-medium text-gray-900 ">
                  {item.lastLogin ? convertDate(item.lastLogin) : "-"}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 ">
                  {item.username}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 ">
                  {item.accountType}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginActivity;


