import { useEffect, useState } from "react";

import API from "../../api/axios";

function StudentReport() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchStudents();

    }, []);


    const fetchStudents = async () => {

        try {

            const response = await API.get(
                "reports/students/"
            );

            setStudents(response.data);

        } catch (error) {

            console.log(
                "Student Report Error:",
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
                        📊 Student Registration Report
                    </h2>

                    <p>
                        Total Students: {students.length}
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

            ) : students.length === 0 ? (

                <p className="loading-text">
                    No students found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Registered Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {students.map((student) => (

                                <tr key={student.id}>

                                    <td>
                                        {student.id}
                                    </td>

                                    <td>
                                        {student.username}
                                    </td>

                                    <td>
                                        {student.email}
                                    </td>

                                    <td>
                                        {student.phone || "-"}
                                    </td>

                                    <td>
                                        {new Date(
                                            student.date_joined
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


export default StudentReport;