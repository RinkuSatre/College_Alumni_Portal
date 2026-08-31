import { useEffect, useState } from "react";

import API from "../../api/axios";


function JobReport() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchJobs();

    }, []);


    const fetchJobs = async () => {

        try {

            const response = await API.get(
                "reports/jobs/"
            );

            setJobs(response.data);

        } catch (error) {

            console.log(
                "Job Report Error:",
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
                        💼 Job Report
                    </h2>

                    <p>
                        Total Jobs: {jobs.length}
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

            ) : jobs.length === 0 ? (

                <p className="loading-text">
                    No jobs found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Location</th>
                                <th>Salary</th>
                                <th>Experience</th>
                                <th>Job Type</th>
                                <th>Last Date</th>
                                <th>Status</th>

                            </tr>

                        </thead>


                        <tbody>

                            {jobs.map((job) => (

                                <tr key={job.id}>

                                    <td>
                                        {job.id}
                                    </td>

                                    <td>
                                        {job.title}
                                    </td>

                                    <td>
                                        {job.company_name}
                                    </td>

                                    <td>
                                        {job.location}
                                    </td>

                                    <td>
                                        {job.salary || "-"}
                                    </td>

                                    <td>
                                        {job.experience} years
                                    </td>

                                    <td>
                                        {job.job_type}
                                    </td>

                                    <td>
                                        {new Date(
                                            job.last_date
                                        ).toLocaleDateString("en-IN")}
                                    </td>

                                    <td>
                                        {job.is_active
                                            ? "Active"
                                            : "Inactive"}
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


export default JobReport;