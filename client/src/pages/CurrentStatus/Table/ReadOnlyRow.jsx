import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";

const Tooltip = ({ text }) => {
    return (
        <>
            {text && text.length > 10 ? (
                <div className="group relative flex flex-col items-center ">
                    {text.substring(0, 10)}...
                    <div className="absolute bottom-0 mb-6 hidden flex-col items-center group-hover:flex">
                        <span className="z-10 break-all rounded-md bg-white p-2 text-xs text-black shadow-lg group-hover:relative">
                            {text}
                        </span>
                        <div className="-mt-2 h-3 w-3 rotate-45 bg-green-500"></div>
                    </div>
                </div>
            ) : (
                <>{text}</>
            )}
        </>
    );
};

const ReadOnlyRow = ({ status, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-2 text-center text-sm text-gray-700";
    var spanClsName =
        "rounded-lg bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider";
    return (
        <>
            <td className={clsName}>{status.order_job_number}</td>
            <td className={clsName}>
                <span className={`${spanClsName} bg-blue-200 text-blue-800`}>
                    {status.LA_name}
                </span>
            </td>
            <td className={clsName}>{status.LV_name}</td>
            <td className={clsName}>
                <DateTime date={status.date_from_charpotro} />
            </td>
            <td className={clsName}>
                <span className={`${spanClsName} bg-green-200 text-green-800`}>
                    {status.commodity}
                </span>
            </td>

            <td className={clsName}>
                <span className={`${spanClsName} bg-green-200 text-green-800`}>
                    {status.dest_from}
                </span>
            </td>
            <td className={clsName}>
                <span className={`${spanClsName} bg-red-200 text-red-800`}>
                    {status.dest_to}
                </span>
            </td>
            <td className={clsName}>
                <span className={`${spanClsName} bg-green-200 text-green-800`}>
                    {status.current_location}
                </span>
            </td>
            <td className={clsName}>
                <span className={`${spanClsName}`}>
                    <Tooltip text={status.remark} />
                </span>
            </td>
            <td className={clsName}>
                <span
                    className={`${spanClsName} ${
                        status.trip_completed == 0
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                    }`}
                >
                    {status.trip_completed == 0 ? "NO" : "YES"}
                </span>
            </td>
            <td className={clsName}>
                <DateTime date={status.time_updated} />
            </td>
            <td className={clsName}>
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, status)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(status.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
