import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../../api/axios";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import "./Applicants.css";

function Applicants() {

    const { id } = useParams();

    const [applicants, setApplicants] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        fetchApplicants();

    }, []);

    const fetchApplicants = async () => {

        try {

            const response = await API.get(
                `jobs/${id}/applicants/`
            );

            setApplicants(response.data);

            setError("");

        }

        catch (err) {

            console.log(err);

            setError("Failed to load applicants.");

        }

        finally {

            setLoading(false);

        }

    };

    const updateStatus = async (
        applicationId,
        status
    ) => {

        try {

            await API.patch(
                `jobs/application/${applicationId}/update/`,
                {
                    status: status,
                }
            );

            alert(
                `Application ${status}`
            );

            fetchApplicants();

        }

        catch (err) {

            console.log(err);

            alert("Failed to update status");

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

            <div className="applicants-container">

                <h2>👥 Job Applicants</h2>

                {applicants.length === 0 ? (

                    <div className="no-applicants">

                        <h3>No Applicants Yet</h3>

                    </div>

                ) : (

                    <div className="applicants-grid">

                        {applicants.map((application) => (

                            <div
                                className="applicant-card"
                                key={application.id}
                            >

                                <h3>
                                    {application.student_name}
                                </h3>

                                <p>

                                    <strong>Job :</strong>{" "}

                                    {application.job_title}

                                </p>

                                <p>

                                    <strong>Status :</strong>{" "}

                                    {application.status}

                                </p>

                                <p>

                                    <strong>Applied On :</strong>{" "}

                                    {new Date(
                                        application.applied_at
                                    ).toLocaleDateString("en-IN")}

                                </p>

                                {/* Resume */}

                                {application.resume && (

                                    <div className="resume-section">

                                        <p>

                                            <strong>
                                                📄 Resume :
                                            </strong>{" "}

                                            {application.resume
                                                .split("/")
                                                .pop()}

                                        </p>

                                        <a
                                            href={
                                                application.resume.startsWith("http")
                                                    ? application.resume
                                                    : `http://127.0.0.1:8000${application.resume}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-resume-btn"
                                        >
                                            View Resume
                                        </a>

                                    </div>

                                )}

                                <div className="status-buttons">

                                    <button
                                        className="accept-btn"
                                        onClick={() =>
                                            updateStatus(
                                                application.id,
                                                "Selected"
                                            )
                                        }
                                    >
                                        ✅ Accept
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() =>
                                            updateStatus(
                                                application.id,
                                                "Rejected"
                                            )
                                        }
                                    >
                                        ❌ Reject
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </>

    );

}

export default Applicants;