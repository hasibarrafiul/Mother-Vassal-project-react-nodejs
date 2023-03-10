import React, { useState, Fragment, useEffect, Suspense } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReadOnlyRow from "./TableRows/ReadOnlyRow";
import EditableRow from "./TableRows/EditTableRow";
import { sha256 } from "js-sha256";
import Axios from "axios";
import Loader from "../../utils/Loader";

import { IoMdPersonAdd } from "react-icons/io";

//toast
import { success, warning } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

const TableHeader = [
    { id: 1, name: "Id", width: "w-8" },
    { id: 2, name: "Order Number", width: "w-16" },
    { id: 3, name: "Job Number", width: "w-16" },
    { id: 4, name: "Date From Charpotro", width: "w-16" },
    { id: 5, name: "CP Number From Charpotro", width: "w-16" },
    { id: 6, name: "LA Name", width: "w-16" },
    { id: 7, name: "LV Name", width: "w-16" },
    { id: 8, name: "MV Name", width: "w-16" },
    { id: 9, name: "Destination From", width: "w-16" },
    { id: 10, name: "Destination To", width: "w-16" },
    { id: 11, name: "Capacity in Tons", width: "w-16" },
    { id: 12, name: "Rate", width: "w-16" },
    { id: 13, name: "60 Percent Payment", width: "w-16" },
    { id: 14, name: "40 Percent Payment", width: "w-16" },
    { id: 15, name: "Damarage", width: "w-16" },
    { id: 16, name: "2nd Trip", width: "w-16" },
    { id: 17, name: "3rd Trip", width: "w-16" },
    { id: 18, name: "Direct Trip", width: "w-16" },
    { id: 19, name: "Actions", width: "w-16" },
];

const App = () => {
    const [ChqList, setChqList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/management/getchqapproval")
            .then((res) => res.json())
            .then((data) => {
                setChqList(data);
            });
    }, [ChqList]);

    // add state
    //id is randomly generated with nanoid generator
    const [addFormData, setAddFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        MV_name: "",
        dest_from: "",
        dest_to: "",
        capacity_ton: "",
        rate: "",
        sixty_percent_payment: "",
        forty_percent_payment: "",
        damarage: "",
        second_trip: "",
        third_trip: "",
        direct_trip: "",
    });

    //edit status
    const [editFormData, setEditFormData] = useState({
        order_number: "",
        job_number: "",
        date_from_charpotro: "",
        cp_number_from_charpotro: "",
        LA_name: "",
        LV_name: "",
        MV_name: "",
        dest_from: "",
        dest_to: "",
        capacity_ton: "",
        rate: "",
        sixty_percent_payment: "",
        forty_percent_payment: "",
        damarage: "",
        second_trip: "",
        third_trip: "",
        direct_trip: "",
    });

    //modified id status
    const [editChqId, setEditChqId] = useState(null);

    //changeHandler
    //Update state with input data
    const handleAddFormChange = (event) => {
        event.preventDefault();

        //fullname, address, phoneNumber, email
        const fieldName = event.target.getAttribute("name");
        //??? input ?????????
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
        //addFormData > event.target(input)
        //fullName:"" > name="fullName", value=fullName input ?????????

        setAddFormData(newFormData);
    };

    //Update status with correction data
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    //submit handler
    //Clicking the Add button adds a new data row to the existing row
    const handleAddFormSubmit = (event) => {
        event.preventDefault(); // ???

        //data.json?????? ???????????? ?????? ?????? ?????? ???????????? ????????? ??? ????????????
        const newChq = {
            order_number: addFormData.order_number, //handleAddFormChange??? ?????? ??? ?????????
            job_number: addFormData.job_number,
            date_from_charpotro: addFormData.date_from_charpotro,
            cp_number_from_charpotro: addFormData.cp_number_from_charpotro,
            LA_name: addFormData.LA_name,
            LV_name: addFormData.LV_name,
            MV_name: addFormData.MV_name,
            dest_from: addFormData.dest_from,
            dest_to: addFormData.dest_to,
            capacity_ton: addFormData.capacity_ton,
            rate: addFormData.rate,
            sixty_percent_payment: addFormData.sixty_percent_payment,
            forty_percent_payment: addFormData.forty_percent_payment,
            damarage: addFormData.damarage,
            second_trip: addFormData.second_trip,
            third_trip: addFormData.third_trip,
            direct_trip: addFormData.direct_trip,
        };

        //const current = new Date();
        //const order_number_auto = newChq.importer_name+'-'+current.getDate().toLocaleString()+'-'+newChq.mother_vessel_name+'-'+newChq.mv_location
        //console.log(order_number_auto)

        // api call
        Axios.post("http://localhost:3001/management/insertchq_approval", {
            order_number: newChq.order_number, //handleAddFormChange??? ?????? ??? ?????????
            job_number: newChq.job_number,
            date_from_charpotro: newChq.date_from_charpotro,
            cp_number_from_charpotro: newChq.cp_number_from_charpotro,
            LA_name: newChq.LA_name,
            LV_name: newChq.LV_name,
            MV_name: newChq.MV_name,
            dest_from: newChq.dest_from,
            dest_to: newChq.dest_to,
            capacity_ton: newChq.capacity_ton,
            rate: newChq.rate,
            sixty_percent_payment: newChq.sixty_percent_payment,
            forty_percent_payment: newChq.forty_percent_payment,
            damarage: newChq.damarage,
            second_trip: newChq.second_trip,
            third_trip: newChq.third_trip,
            direct_trip: newChq.direct_trip,
        });

        //ChqList??? ???????????? data.json ?????????
        const newChqList = [...ChqList, newChq];
        setChqList(newChqList);

        // close modal
        closeModal();

        // toast
        success("Chq added successfully");
    };

    //save modified data (App component)
    const handleEditFormSubmit = (event) => {
        event.preventDefault(); // prevent submit

        const editedChq = {
            id: editChqId, //initial value null
            order_number: editFormData.order_number,
            job_number: editFormData.job_number,
            date_from_charpotro: editFormData.date_from_charpotro,
            cp_number_from_charpotro: editFormData.cp_number_from_charpotro,
            LA_name: editFormData.LA_name,
            LV_name: editFormData.LV_name,
            MV_name: editFormData.MV_name,
            dest_from: editFormData.dest_from,
            dest_to: editFormData.dest_to,
            capacity_ton: editFormData.capacity_ton,
            rate: editFormData.rate,
            sixty_percent_payment: editFormData.sixty_percent_payment,
            forty_percent_payment: editFormData.forty_percent_payment,
            damarage: editFormData.damarage,
            second_trip: editFormData.second_trip,
            third_trip: editFormData.third_trip,
            direct_trip: editFormData.direct_trip,
        };

        Axios.post("http://localhost:3001/management/updatechq_approval", {
            id: editedChq.id,
            new_order_number: editedChq.order_number,
            new_job_number: editedChq.job_number,
            new_date_from_charpotro: editedChq.date_from_charpotro,
            new_cp_number_from_charpotro: editedChq.cp_number_from_charpotro,
            new_LA_name: editedChq.LA_name,
            new_LV_name: editedChq.LV_name,
            new_MV_name: editedChq.MV_name,
            new_dest_from: editedChq.dest_from,
            new_dest_to: editedChq.dest_to,
            new_capacity_ton: editedChq.capacity_ton,
            new_rate: editedChq.rate,
            new_sixty_percent_payment: editedChq.sixty_percent_payment,
            new_forty_percent_payment: editedChq.forty_percent_payment,
            new_damarage: editedChq.damarage,
            new_second_trip: editedChq.second_trip,
            new_third_trip: editedChq.third_trip,
            new_direct_trip: editedChq.direct_trip,
        });

        const newChqList = [...ChqList]; //json.data + data added with setChqList above by receiving new input
        const index = ChqList.findIndex((Chq) => Chq.id === editChqId);
        newChqList[index] = editedChq; // Assign the modified data object to the object of the index row of the ChqList array, which is the entire data

        setChqList(newChqList);
        setEditChqId(null);
        success("Chq updated successfully");
    };

    //Read-only data If you click the edit button, the existing data is displayed
    const handleEditClick = (event, Chq) => {
        event.preventDefault(); // ???

        setEditChqId(Chq.id);
        const formValues = {
            order_number: Chq.order_number,
            job_number: Chq.job_number,
            date_from_charpotro: Chq.date_from_charpotro,
            cp_number_from_charpotro: Chq.cp_number_from_charpotro,
            LA_name: Chq.LA_name,
            LV_name: Chq.LV_name,
            MV_name: Chq.MV_name,
            dest_from: Chq.dest_from,
            dest_to: Chq.dest_to,
            capacity_ton: Chq.capacity_ton,
            rate: Chq.rate,
            sixty_percent_payment: Chq.sixty_percent_payment,
            forty_percent_payment: Chq.forty_percent_payment,
            damarage: Chq.damarage,
            second_trip: Chq.second_trip,
            third_trip: Chq.third_trip,
            direct_trip: Chq.direct_trip,
        };
        setEditFormData(formValues);
    };

    //Cancel button when clicked on edit
    const handleCancelClick = () => {
        setEditChqId(null);
    };

    // delete
    const handleDeleteClick = (ChqId) => {
        const newChqList = [...ChqList];
        const index = ChqList.findIndex((Chq) => Chq.id === ChqId);
        //console.log("Deleting Chq with id: " + ChqId);
        Axios.post("http://localhost:3001/management/deletechq_approval", {
            Chq_id: ChqId,
        }).then((response) => {
            if (response.data == "success") {
                success("Chq deleted successfully");
            }
        });

        newChqList.splice(index, 1);
        setChqList(newChqList);
    };

    // search filter
    const [query, setQuery] = useState("");

    const filteredChq =
        query === ""
            ? ChqList
            : ChqList.filter((Chq) =>
                  Chq.order_number
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    // modal for add Chq
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    // logout
    if (localStorage.getItem("user_type") == "admin") {
    } else if (localStorage.getItem("user_type") == "operations") {
        window.location.href = "/";
    } else {
        window.location.href = "/login";
    }
    const logout = () => {
        localStorage.setItem("loggedin", "false");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_type");
        window.location.href = "/login";
    };

    //If save(submit) is pressed after editing is completed, submit > handleEditFormSubmit action
    return (
        <div className="m-2 mt-4">
            <div className="flex flex-row justify-center">
                <button
                    className="flex flex-row items-center justify-center rounded-md bg-green-300 px-3 py-0 text-sm font-semibold text-gray-900 transition duration-500 ease-in-out hover:bg-green-400"
                    onClick={openModal}
                >
                    Add Chq Approval <IoMdPersonAdd className="ml-2 inline h-5 w-5" />
                </button>
                <input
                    className="mx-auto block w-1/2 rounded-md border-2 border-slate-300 bg-white py-2 shadow-lg placeholder:italic placeholder:text-slate-500 focus:border-green-500 focus:ring-0 sm:text-sm"
                    placeholder="Search for name..."
                    type="search"
                    name="search"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button
                    className="rounded-md bg-red-500 px-3 py-0 text-sm font-semibold text-white transition duration-500 ease-in-out hover:bg-red-700"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            <br />
            <form onSubmit={handleEditFormSubmit}>
                <table className="w-full rounded-md">
                    <thead className="rounded-md border-b-2 border-gray-400 bg-orange-200">
                        <tr>
                            {TableHeader.map((header) => (
                                <th
                                    key={header.id}
                                    className={`border-r-2 px-2 text-left text-sm font-semibold tracking-wide ${header.width}`}
                                >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 rounded-md">
                        {filteredChq.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredChq.map((Chq, idx) => (
                                <tr
                                    key={Chq.id}
                                    className={`bg-white ${
                                        idx % 2 === 1 ? "bg-gray-200" : ""
                                    }`}
                                >
                                    {editChqId === Chq.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={
                                                handleEditFormChange
                                            }
                                            handleCancelClick={
                                                handleCancelClick
                                            }
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            Chq={Chq}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={
                                                handleDeleteClick
                                            }
                                        />
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </form>

            {/* add item modal */}
            <Suspense fallback={<Loader />}>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={closeModal}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="mb-4 text-center text-3xl font-medium text-gray-900"
                                        >
                                            Add Chq
                                        </Dialog.Title>
                                        <form
                                            onSubmit={handleAddFormSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Order Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="order_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    disabled
                                                    placeholder="Will be fetched"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Job Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="job_number"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    disabled
                                                    placeholder="Will be fetched"
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Date From Charpotro
                                                </label>
                                                <input
                                                    type="date"
                                                    name="date_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    CP Number From Charpotro
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cp_number_from_charpotro"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LA Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LA_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    LV Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="LV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    MV Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="MV_name"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination From
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dest_from"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Destination To
                                                </label>
                                                <input
                                                    type="text"
                                                    name="dest_to"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Capacity in Ton
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity_ton"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Rate
                                                </label>
                                                <input
                                                    type="number"
                                                    name="rate"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    required
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    60 Percent Payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="sixty_percent_payment"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    40 Percent Payment
                                                </label>
                                                <input
                                                    type="text"
                                                    name="forty_percent_payment"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Damarage
                                                </label>
                                                <input
                                                    type="text"
                                                    name="damarage"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    2nd Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="second_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    3rd Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="third_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <div className="group relative w-72 md:w-80 lg:w-96">
                                                <label className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400">
                                                    Direct Trip
                                                </label>
                                                <input
                                                    type="text"
                                                    name="direct_trip"
                                                    onChange={
                                                        handleAddFormChange
                                                    }
                                                    className="peer h-10 w-full rounded-md bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                            >
                                                Add
                                            </button>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </Suspense>

            {/* toast  */}
            <ToastContainer closeOnClick />
        </div>
    );
};

export default App;
