import { useEffect, useState } from "react";

import API from "../../api/axios";


function EventReport() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchEvents();

    }, []);


    const fetchEvents = async () => {

        try {

            const response = await API.get(
                "reports/events/"
            );

            setEvents(response.data);

        } catch (error) {

            console.log(
                "Event Report Error:",
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
                        📅 Event Report
                    </h2>

                    <p>
                        Total Events: {events.length}
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

            ) : events.length === 0 ? (

                <p className="loading-text">
                    No events found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Event Title</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Venue</th>
                                <th>Capacity</th>
                                <th>Registration Deadline</th>
                                <th>Status</th>
                                <th>Created By</th>

                            </tr>

                        </thead>


                        <tbody>

                            {events.map((event) => (

                                <tr key={event.id}>

                                    <td>
                                        {event.id}
                                    </td>

                                    <td>
                                        {event.title}
                                    </td>

                                    <td>
                                        {event.event_type}
                                    </td>

                                    <td>
                                        {new Date(
                                            event.event_date
                                        ).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>
                                        {event.event_time}
                                    </td>

                                    <td>
                                        {event.venue}
                                    </td>

                                    <td>
                                        {event.capacity}
                                    </td>

                                    <td>
                                        {new Date(
                                            event.registration_deadline
                                        ).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>
                                        {event.status}
                                    </td>

                                    <td>
                                        {event.created_by_name}
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


export default EventReport;