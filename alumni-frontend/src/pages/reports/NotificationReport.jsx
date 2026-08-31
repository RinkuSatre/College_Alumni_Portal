import { useEffect, useState } from "react";

import API from "../../api/axios";


function NotificationReport() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchNotifications();

    }, []);


    const fetchNotifications = async () => {

        try {

            const response = await API.get(
                "reports/notifications/"
            );

            setNotifications(response.data);

        } catch (error) {

            console.log(
                "Notification Report Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <>

            <div className="report-header">

                <div>

                    <h2>
                        🔔 Notification Report
                    </h2>

                    <p>
                        Total Notifications: {notifications.length}
                    </p>

                </div>


                <button
                    className="print-btn"
                    onClick={() => window.print()}
                >
                    🖨️ Print / PDF
                </button>

            </div>


            {loading ? (

                <p className="loading-text">
                    Loading report...
                </p>

            ) : notifications.length === 0 ? (

                <p className="loading-text">
                    No notifications found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Created Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {notifications.map((notification) => (

                                <tr key={notification.id}>

                                    <td>
                                        {notification.id}
                                    </td>

                                    <td>
                                        {notification.user_name}
                                    </td>

                                    <td>
                                        {notification.title}
                                    </td>

                                    <td>
                                        {notification.message}
                                    </td>

                                    <td>
                                        {notification.is_read
                                            ? "Read"
                                            : "Unread"}
                                    </td>

                                    <td>
                                        {new Date(
                                            notification.created_at
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </>

    );
}


export default NotificationReport;