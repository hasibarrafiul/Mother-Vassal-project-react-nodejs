import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import DateTime from "../../../utils/DateTime";
import FormateNumber from "../../../utils/FormateNumber";

const ReadOnlyRow = ({ record, handleEditClick, handleDeleteClick }) => {
    var clsName = "whitespace-nowrap py-3 text-sm text-gray-700";

    return (
        <>
            <td className={clsName}>{record.order_number}</td>
            <td className={`text-center ${clsName}`}>
                <span className="text-md mx-4 rounded-md bg-red-200 bg-opacity-50 p-1.5 font-medium tracking-wider text-red-800">
                    {record.job_number}
                </span>
            </td>
            <td className={`text-center ${clsName}`}>
                <span className="rounded-lg bg-green-200 bg-opacity-50 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800">
                    {record.commodity}
                </span>
            </td>
            <td className={clsName}>
                {/* <DateTime date={record.date_from_charpotro} /> */}
                <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                    {new Date(record.date_from_charpotro).toLocaleString(
                        "en-GB",
                        {
                            timeZone: "Asia/Dhaka",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        }
                    )}
                </span>
            </td>
            <td className={`text-center ${clsName}`}>
                {record.cp_number_from_charpotro}
            </td>
            <td className={clsName}>{record.LA_name}</td>
            <td className={clsName}>
                <a
                    href={`/own-ship/${record.LV_name}`}
                    className="font-bold text-blue-500 hover:underline"
                >
                    {record.LV_name}
                </a>
            </td>
            <td className={clsName}>{record.dest_from}</td>
            <td className={clsName}>{record.dest_to}</td>
            <td className={`text-center ${clsName}`}>{record.capacity}</td>
            <td className={`text-center ${clsName}`}>{record.rate}</td>
            <td className={clsName}>{record.LV_master_name}</td>

            <td className={`text-center ${clsName}`}>
                <FormateNumber number={record.LV_master_contact_number} />
            </td>
            <td className={clsName}>
                <DateTime date={record.date_created} />
            </td>
            <td className={clsName}>
                <button
                    type="button"
                    className="mr-2 rounded-md bg-blue-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-blue-400"
                    onClick={(event) => handleEditClick(event, record)}
                >
                    <BiEdit className="h-5 w-5 text-black" />
                </button>
                <button
                    type="button"
                    className="rounded-md bg-red-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-red-400"
                    onClick={() => handleDeleteClick(record.id)}
                >
                    <BiTrash className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default ReadOnlyRow;
