import { useEffect, useState } from "react";

import API from "../../api/axios";


function EventRegistrationReport() {

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchRegistrations();

    }, []);


    const fetchRegistrations = async () => {

        try {

            const response = await API.get(
                "reports/event-registrations/"
            );

            setRegistrations(response.data);

        } catch (error) {

            console.log(
                "Event Registration Report Error:",
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
                        📝 Event Registration Report
                    </h2>

                    <p>
                        Total Registrations: {registrations.length}
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

            ) : registrations.length === 0 ? (

                <p className="loading-text">
                    No registrations found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Event</th>
                                <th>Attendance Status</th>
                                <th>Registered Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {registrations.map((registration) => (

                                <tr key={registration.id}>

                                    <td>
                                        {registration.id}
                                    </td>

                                    <td>
                                        {registration.user_name}
                                    </td>

                                    <td>
                                        {registration.event_title}
                                    </td>

                                    <td>
                                        {registration.attendance_status}
                                    </td>

                                    <td>
                                        {new Date(
                                            registration.registered_at
                                        ).toLocaleDateString("en-IN")}
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


export default EventRegistrationReport;