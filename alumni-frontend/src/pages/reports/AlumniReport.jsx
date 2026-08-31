import { useEffect, useState } from "react";

import API from "../../api/axios";


function AlumniReport() {

    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchAlumni();

    }, []);


    const fetchAlumni = async () => {

        try {

            const response = await API.get(
                "reports/alumni/"
            );

            setAlumni(response.data);

        } catch (error) {

            console.log(
                "Alumni Report Error:",
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
                        📊 Alumni Registration Report
                    </h2>

                    <p>
                        Total Alumni: {alumni.length}
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

            ) : alumni.length === 0 ? (

                <p className="loading-text">
                    No alumni found.
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

                            {alumni.map((user) => (

                                <tr key={user.id}>

                                    <td>
                                        {user.id}
                                    </td>

                                    <td>
                                        {user.username}
                                    </td>

                                    <td>
                                        {user.email}
                                    </td>

                                    <td>
                                        {user.phone || "-"}
                                    </td>

                                    <td>
                                        {new Date(
                                            user.date_joined
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


export default AlumniReport;