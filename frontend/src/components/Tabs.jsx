// import { tabsData } from "../data/dummyData"
// import CreateModal from "./CreateModal";
import { useState } from "react";


const TabComponent = ({ accountType, setAccountType }) => {
    const [activeTab, setActiveTab] = useState("employee");

    const tabsData = [
        {
            id: "Employee",
            data: "Employee"
        },
        {
            id: "Manager",
            data: "Manager"
        },
        {
            id: "Admin",
            data: "Admin",
        }
    ]


    const tabClickHandler = (id) => {
        setAccountType(id);
    }
    // if (activeTab === "create") {
    //     setShowModal(true)
    // }
    return (
        <div className="overflow-x-auto max-w-[75%] my-0 mx-auto pr-0">
            <div className='mb-2 mt-2 border-b-0'>

                {
                    tabsData.map((tabData) => (
                        <button className="px-6 py-3 bg-gray-500 border-r border-gray-300 w-auto text-[#ffff] font-bold hover:bg-blue-300" onClick={() => tabClickHandler(tabData.id)}> {tabData.data} </button>
                    ))
                }
            </div>

        </div>


    );
}

export default TabComponent;