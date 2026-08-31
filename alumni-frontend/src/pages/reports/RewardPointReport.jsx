import { useEffect, useState } from "react";

import API from "../../api/axios";


function RewardPointReport() {

    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchRewards();

    }, []);


    const fetchRewards = async () => {

        try {

            const response = await API.get(
                "reports/rewards/"
            );

            setRewards(response.data);

        } catch (error) {

            console.log(
                "Reward Point Report Error:",
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
                        ⭐ Reward Points Report
                    </h2>

                    <p>
                        Total Reward Entries: {rewards.length}
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

            ) : rewards.length === 0 ? (

                <p className="loading-text">
                    No reward points found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Points</th>
                                <th>Reason</th>
                                <th>Created Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {rewards.map((reward) => (

                                <tr key={reward.id}>

                                    <td>
                                        {reward.id}
                                    </td>

                                    <td>
                                        {reward.user_name}
                                    </td>

                                    <td>
                                        {reward.points}
                                    </td>

                                    <td>
                                        {reward.reason}
                                    </td>

                                    <td>
                                        {new Date(
                                            reward.created_at
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


export default RewardPointReport;