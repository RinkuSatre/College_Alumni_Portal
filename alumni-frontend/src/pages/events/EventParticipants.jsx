import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import API from "../../api/axios";

import "./EventParticipants.css";

function EventParticipants() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [participants, setParticipants] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchParticipants();

    }, [id]);

    const fetchParticipants = async () => {

        try {

            const response = await API.get(
                `events/${id}/participants/`
            );

            setParticipants(
                response.data.results || response.data
            );

            setError("");

        }

        catch (error) {

            console.log(
                "Participants Error :",
                error
            );

            setError(
                "Failed to load event registrations."
            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <h2 style={{ textAlign: "center" }}>
                Loading...
            </h2>
        );

    }

    if (error) {

        return (
            <h2 style={{ textAlign: "center" }}>
                {error}
            </h2>
        );

    }

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="participants-container">

                <div className="participants-header">

                    <h2>
                        👥 Event Registrations
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(`/events/${id}`)
                        }
                    >
                        ← Back to Event
                    </button>

                </div>

                {participants.length === 0 ? (

                    <div className="no-participants">

                        <h3>
                            No Registrations Yet
                        </h3>

                        <p>
                            No one has registered
                            for this event yet.
                        </p>

                    </div>

                ) : (

                    <div className="participants-grid">

                        {participants.map(
                            (participant) => (

                                <div
                                    className="participant-card"
                                    key={participant.id}
                                >

                                    <h3>
                                        👤{" "}
                                        {participant.user_name}
                                    </h3>

                                    <p>
                                        <strong>
                                            Status :
                                        </strong>{" "}

                                        {
                                            participant.attendance_status
                                        }
                                    </p>

                                    <p>
                                        <strong>
                                            Registered On :
                                        </strong>{" "}

                                        {new Date(
                                            participant.registered_at
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )}
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </>

    );

}

export default EventParticipants;