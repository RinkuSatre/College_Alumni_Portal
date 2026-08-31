import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Notification.css";


function Notification() {

    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetchNotifications();


    }, []);

    const fetchNotifications = async () => {

        try {

            const response = await API.get(
                "notifications/"
            );

            setNotifications(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const markNotificationRead = async (item) => {

        try {

            await API.patch(
                `notifications/${item.id}/read/`
            );

            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === item.id
                        ? { ...notification, is_read: true }
                        : notification
                )
            );

            if (item.link) {
                navigate(item.link);
            }

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />
            <Topbar />

            <div className="notification-container">

                <h2>🔔 Notifications</h2>

                {

                    notifications.length === 0 ? (

                        <p>No Notifications Found.</p>

                    ) : (

                        notifications.map((item) => (

                            <div
                                className={`notification-card ${
                                    item.is_read ? "read" : "unread"
                                }`}
                                key={item.id}
                                onClick={() => markNotificationRead(item)}
                            >

                                <h3>{item.title}</h3>

                                <p>{item.message}</p>

                                <small>

                                    {new Date(item.created_at).toLocaleString()}

                                </small>

                            </div>

                        ))

                    )

                }

            </div>

        </>

    );

}

export default Notification;