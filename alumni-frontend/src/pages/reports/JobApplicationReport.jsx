import { useEffect, useState } from "react";

import API from "../../api/axios";


function JobApplicationReport() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchApplications();

    }, []);


    const fetchApplications = async () => {

        try {

            const response = await API.get(
                "reports/job-applications/"
            );

            setApplications(response.data);

        } catch (error) {

            console.log(
                "Job Application Report Error:",
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
                        📋 Job Application Report
                    </h2>

                    <p>
                        Total Applications: {applications.length}
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

            ) : applications.length === 0 ? (

                <p className="loading-text">
                    No applications found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Student</th>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Applied Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {applications.map((application) => (

                                <tr key={application.id}>

                                    <td>
                                        {application.id}
                                    </td>

                                    <td>
                                        {application.student_name}
                                    </td>

                                    <td>
                                        {application.job_title}
                                    </td>

                                    <td>
                                        {application.company_name}
                                    </td>

                                    <td>
                                        {application.status}
                                    </td>

                                    <td>
                                        {new Date(
                                            application.applied_at
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


export default JobApplicationReport;