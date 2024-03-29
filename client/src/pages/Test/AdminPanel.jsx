import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { sha256 } from "js-sha256";

import { useAuth } from "../../hooks/useAuth";

const TableHeader = [
    {
        id: 1,
        name: "Id",
        accessor: "id",
        sortable: true,
        width: "w-8",
    },
    {
        id: 2,
        name: "Name",
        accessor: "name",
        sortable: true,
    },
    {
        id: 3,
        name: "Username",
        accessor: "username",
        sortable: true,
    },
    {
        id: 4,
        name: "Position",
        accessor: "position",
        sortable: true,
    },
    {
        id: 5,
        name: "Department",
        accessor: "department",
        sortable: true,
    },
    {
        id: 6,
        name: "Status",
        accessor: "status",
        sortable: true,
    },
    {
        id: 7,
        name: "Reset Password",
        accessor: "reset_password",
        sortable: false,
    },
    { id: 8, name: "Actions" },
];

export default function AdminPanel() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userList, setUserList] = useState([]);
    const { logout } = useAuth();

    useEffect(() => {
        fetch("http://localhost:3001/admin/getusers")
            .then((res) => res.json())
            .then((data) => {
                setUserList(data);
            });
    }, []);

    const enable_user = (userid) => {
        Axios.post("http://localhost:3001/admin/enableuser/", {
            user_id: userid,
        });
    };
    const disable_user = (userid) => {
        Axios.post("http://localhost:3001/admin/disableuser/", {
            user_id: userid,
        });
    };
    const resetPassword = (userid) => {
        if (newPassword == confirmPassword) {
            Axios.post("http://localhost:3001/admin/resetpassword/", {
                user_id: userid,
                new_password: sha256(newPassword),
            });
            alert("Password has been reset");
        } else {
            alert("Passwords do not match");
        }
    };

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                onClick={redirectToAddUser}
            >
                Add User
            </button>
            <button
                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
                onClick={logout}
            >
                Logout
            </button>

            <div className="flex-1 rounded-sm border border-gray-200 bg-white px-4 pt-3 pb-4">
                <strong className="font-medium text-gray-700">Users</strong>
                <div className="mt-3 rounded-sm border-x border-gray-200">
                    <table
                        className="w-full text-gray-700"
                        style={{ textAlign: "center" }}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Created On</th>
                                <th>Update Info</th>
                                <th>Change Password</th>
                                <th>Enable/Disable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <Link to={`${user.id}`}>{user.id}</Link>
                                    </td>
                                    <td>
                                        <Link to={`${user.name}`}>
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`${user.username}`}>
                                            {user.username}
                                        </Link>
                                    </td>

                                    <td>{user.position}</td>
                                    <td>{user.department}</td>
                                    <td>
                                        {format(
                                            new Date(user.user_created_time),
                                            "dd MMM yyyy"
                                        )}
                                    </td>
                                    <td>
                                        <a
                                            href={`/update-info/${user.id}`}
                                            className="rounded bg-purple-500 py-2 px-4 font-bold text-white hover:bg-purple-700"
                                        >
                                            Update Info
                                        </a>
                                    </td>
                                    <td>
                                        <Popup
                                            trigger={
                                                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                                                    {" "}
                                                    Reset Password
                                                </button>
                                            }
                                            modal
                                            nested
                                        >
                                            {(close) => (
                                                <div className="modal">
                                                    <button
                                                        className="close"
                                                        onClick={close}
                                                    >
                                                        &times;
                                                    </button>
                                                    <div className="content">
                                                        <div>
                                                            <input
                                                                type="password"
                                                                placeholder="New Password"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setNewPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <input
                                                                type="password"
                                                                placeholder="Confirm Password"
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setConfirmPassword(
                                                                        e.target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <button
                                                                className="rounded bg-purple-500 py-2 px-4 font-bold text-white hover:bg-purple-700"
                                                                onClick={() => {
                                                                    resetPassword(
                                                                        user.id
                                                                    );
                                                                    close();
                                                                }}
                                                            >
                                                                Reset
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Popup>
                                    </td>
                                    {user.enabled === 1 ? (
                                        <td>
                                            <button
                                                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                                onClick={() => {
                                                    disable_user(user.id);
                                                }}
                                            >
                                                Disable
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button
                                                className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                                                onClick={() => {
                                                    enable_user(user.id);
                                                }}
                                            >
                                                Enable
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
