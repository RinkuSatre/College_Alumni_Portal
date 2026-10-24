
import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // FETCH USERS
    const fetchUsers = async () => {
        try {
            const response = await API.get("reports/users/");

            const data = response.data;
            setUsers(Array.isArray(data) ? data : data.results || []);
        } catch (error) {
            console.error("Users Error:", error.response?.data || error);
            alert("Unable to load users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // VERIFY / UNVERIFY USER
    const handleVerify = async (userId) => {
        try {
            setUpdatingId(userId);

            const response = await API.patch(
                `reports/users/${userId}/verify/`
            );

            if (response.data.user) {
                setUsers((previousUsers) =>
                    previousUsers.map((user) =>
                        user.id === userId
                            ? { ...user, ...response.data.user }
                            : user
                    )
                );
            } else {
                await fetchUsers();
            }

            if (response.data.message) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Verify Error:", error.response?.data || error);

            alert(
                error.response?.data?.detail ||
                "Unable to update user verification status."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // DELETE USER
    const handleDelete = async (user) => {
        if (user.role === "admin") {
            alert("Admin accounts cannot be deleted from User Management.");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete user "${user.username}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setDeletingId(user.id);

            await API.delete(`reports/users/${user.id}/`);

            setUsers((previousUsers) =>
                previousUsers.filter((item) => item.id !== user.id)
            );

            alert("User deleted successfully.");
        } catch (error) {
            console.error("Delete User Error:", error.response?.data || error);

            alert(
                error.response?.data?.detail ||
                "Unable to delete user. Please check the delete API and admin permissions."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // SEARCH AND ROLE FILTER
    const filteredUsers = users.filter((user) => {
        const searchText = search.toLowerCase();

        const username = (user.username || "").toLowerCase();
        const email = (user.email || "").toLowerCase();

        const matchesSearch =
            username.includes(searchText) ||
            email.includes(searchText);

        const matchesRole =
            roleFilter === "all" ||
            user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // STATISTICS
    const totalUsers = users.length;

    const totalStudents = users.filter(
        (user) => user.role === "student"
    ).length;

    const totalAlumni = users.filter(
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
                        <h1>👥 Users Management</h1>
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
                            <h3>{totalUsers}</h3>
                            <p>Total Users</p>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <span>🎓</span>
                        <div>
                            <h3>{totalStudents}</h3>
                            <p>Students</p>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <span>💼</span>
                        <div>
                            <h3>{totalAlumni}</h3>
                            <p>Alumni</p>
                        </div>
                    </div>
                </div>

                {/* SEARCH AND FILTER */}
                <div className="users-filters">
                    <input
                        type="text"
                        placeholder="🔍 Search username or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Users</option>
                        <option value="student">Students</option>
                        <option value="alumni">Alumni</option>
                    </select>
                </div>

                {/* USERS TABLE */}
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
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>

                                        <td className="username-cell">
                                            {user.username || "-"}
                                        </td>

                                        <td>{user.email || "-"}</td>

                                        <td>{user.phone || "-"}</td>

                                        <td>
                                            <span
                                                className={`role-badge ${user.role}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* STATUS */}
                                        <td>
                                            {user.is_verified ? (
                                                <span className="verified">
                                                    ✓ Verified
                                                </span>
                                            ) : (
                                                <span className="unverified">
                                                    Not Verified
                                                </span>
                                            )}
                                        </td>

                                        {/* ACTIONS */}
                                        <td>
                                            <div className="user-action-buttons">
                                                <button
                                                    type="button"
                                                    className={
                                                        user.is_verified
                                                            ? "unverify-btn"
                                                            : "verify-btn"
                                                    }
                                                    disabled={
                                                        updatingId === user.id ||
                                                        deletingId === user.id
                                                    }
                                                    onClick={() =>
                                                        handleVerify(user.id)
                                                    }
                                                >
                                                    {updatingId === user.id
                                                        ? "Updating..."
                                                        : user.is_verified
                                                        ? "Unverify"
                                                        : "Verify"}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="delete-user-btn"
                                                    disabled={
                                                        deletingId === user.id ||
                                                        updatingId === user.id ||
                                                        user.role === "admin"
                                                    }
                                                    onClick={() =>
                                                        handleDelete(user)
                                                    }
                                                >
                                                    {deletingId === user.id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </td>

                                        {/* JOINED DATE */}
                                        <td>
                                            {user.date_joined
                                                ? new Date(
                                                    user.date_joined
                                                ).toLocaleDateString("en-IN")
                                                : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

export default Users;
