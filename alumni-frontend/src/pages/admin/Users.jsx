import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Users.css";

function Users() {

    const handleVerify = async (userId) => {
        try {
            const response = await API.patch(
            `reports/users/${userId}/verify/`
            );

            alert(response.data.message);

            fetchUsers();

        } catch (error) {
            console.log("Verify Error:", error);

            alert(
            error.response?.data?.detail ||
            "Something went wrong."
            );
        }
    };

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchUsers();

    }, []);


    const fetchUsers = async () => {

        try {

            const response = await API.get(
                "reports/users/"
            );

            setUsers(response.data);

        } catch (error) {

            console.log(
                "Users Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const filteredUsers = users.filter((user) => {

        const searchText =
            search.toLowerCase();

        const matchesSearch =
            user.username
                .toLowerCase()
                .includes(searchText) ||

            user.email
                .toLowerCase()
                .includes(searchText);


        const matchesRole =
            roleFilter === "all" ||
            user.role === roleFilter;


        return (
            matchesSearch &&
            matchesRole
        );

    });


    const totalUsers =
        users.length;


    const totalStudents =
        users.filter(
            (user) => user.role === "student"
        ).length;


    const totalAlumni =
        users.filter(
            (user) => user.role === "alumni"
        ).length;


    return (

        <>

            <Sidebar />

            <Topbar />


            <div className="users-container">


                {/* PAGE HEADER */}

                <div className="users-header">

                    <div>

                        <h1>
                            👥 Users Management
                        </h1>

                        <p>
                            Manage registered students and alumni
                        </p>

                    </div>

                </div>


                {/* STAT CARDS */}

                <div className="user-stats">


                    <div className="user-stat-card">

                        <span>👥</span>

                        <div>

                            <h3>
                                {totalUsers}
                            </h3>

                            <p>
                                Total Users
                            </p>

                        </div>

                    </div>


                    <div className="user-stat-card">

                        <span>🎓</span>

                        <div>

                            <h3>
                                {totalStudents}
                            </h3>

                            <p>
                                Students
                            </p>

                        </div>

                    </div>


                    <div className="user-stat-card">

                        <span>💼</span>

                        <div>

                            <h3>
                                {totalAlumni}
                            </h3>

                            <p>
                                Alumni
                            </p>

                        </div>

                    </div>


                </div>


                {/* SEARCH + FILTER */}

                <div className="users-filters">


                    <input
                        type="text"
                        placeholder="🔍 Search username or email..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    <select
                        value={roleFilter}
                        onChange={(e) =>
                            setRoleFilter(e.target.value)
                        }
                    >

                        <option value="all">
                            All Users
                        </option>

                        <option value="student">
                            Students
                        </option>

                        <option value="alumni">
                            Alumni
                        </option>

                    </select>


                </div>


                {/* TABLE */}

                {loading ? (

                    <p className="users-message">
                        Loading users...
                    </p>

                ) : filteredUsers.length === 0 ? (

                    <p className="users-message">
                        No users found.
                    </p>

                ) : (

                    <div className="users-table-container">

                        <table className="users-table">


                            <thead>

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        Username
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Phone
                                    </th>

                                    <th>
                                        Role
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                    <th>
                                        Joined
                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {filteredUsers.map(
                                    (user) => (

                                        <tr
                                            key={user.id}
                                        >

                                            <td>
                                                {user.id}
                                            </td>

                                            <td className="username-cell">
                                                {user.username}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {user.phone || "-"}
                                            </td>

                                            <td>

                                                <span
                                                    className={`role-badge ${user.role}`}
                                                >
                                                    {user.role}
                                                </span>

                                            </td>

                                            <td>

                                                {user.is_verified ? (

                                                    <span className="verified">
                                                    ✓ Verified
                                                    </span>

                                                ) : (

                                                    <button
                                                    className="verify-btn"
                                                    onClick={() => handleVerify(user.id)}
                                                    >
                                                    ✓ Verify
                                                    </button>

                                                )}

                                            </td>

                                            <td>
                                                <button
                                                    className={
                                                    user.is_verified
                                                        ? "unverify-btn"
                                                        : "verify-btn"
                                                    }
                                                    onClick={() => handleVerify(user.id)}
                                                >
                                                    {user.is_verified ? "Unverify" : "Verify"}
                                                </button>
                                            </td>

                                            <td>

                                                {new Date(
                                                    user.date_joined
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}

                                            </td>

                                        </tr>

                                    )
                                )}


                            </tbody>


                        </table>

                    </div>

                )}


            </div>

        </>

    );

}

export default Users;