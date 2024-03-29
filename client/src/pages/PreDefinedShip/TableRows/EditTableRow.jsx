import React from "react";
import { FiCheck } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import Select from "../../../components/Select";
const EditTableRow = ({
    editFormData,
    handleEditFormChange,
    handleCancelClick,
}) => {
    var clsName =
        "w-full rounded-md bg-gray-50 text-sm outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400";
    return (
        <>
            <td></td>
            <td></td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    name="order_job_date"
                    /*value={editFormData.date_from_charpotro.slice(0, 10)}*/
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="date"
                    required
                    name="date_from_charpotro"
                    /*value={editFormData.date_from_charpotro.slice(0, 10)}*/
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Commodity..."
                    name="commodity"
                    value={editFormData.commodity}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="LA"
                    name="LA"
                    value={editFormData.LA}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Destination From..."
                    name="dest_from"
                    value={editFormData.dest_from}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Destination To..."
                    name="dest_to"
                    value={editFormData.dest_to}
                    onChange={handleEditFormChange}
                />
            </td>

            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Current Location..."
                    name="current_location"
                    value={editFormData.current_location}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    className={clsName}
                    type="text"
                    required
                    placeholder="Remark..."
                    name="remark"
                    value={editFormData.remark}
                    onChange={handleEditFormChange}
                />
            </td>
            <td className="text-center text-sm">
                <span className="rounded-lg bg-red-200 bg-opacity-50 text-xs font-medium uppercase tracking-wider text-red-800">
                    Auto generated
                </span>
            </td>
            <td className="flex items-center justify-around py-2">
                <button
                    className="mr-2 rounded-md bg-green-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-green-400"
                    type="submit"
                >
                    <FiCheck className="h-5 w-5 text-black" />
                </button>
                <button
                    className="rounded-md bg-yellow-300 p-2 font-semibold text-gray-700 transition duration-500 ease-in-out hover:bg-yellow-400"
                    type="button"
                    onClick={handleCancelClick}
                >
                    <ImCancelCircle className="h-5 w-5 text-black" />
                </button>
            </td>
        </>
    );
};

export default EditTableRow;
