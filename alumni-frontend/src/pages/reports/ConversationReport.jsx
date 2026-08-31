import { useEffect, useState } from "react";

import API from "../../api/axios";


function ConversationReport() {

    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchConversations();

    }, []);


    const fetchConversations = async () => {

        try {

            const response = await API.get(
                "reports/conversations/"
            );

            setConversations(response.data);

        } catch (error) {

            console.log(
                "Conversation Report Error:",
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
                        💬 Conversation Report
                    </h2>

                    <p>
                        Total Conversations: {conversations.length}
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

            ) : conversations.length === 0 ? (

                <p className="loading-text">
                    No conversations found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Student</th>
                                <th>Alumni</th>
                                <th>Created Date</th>
                                <th>Last Updated</th>

                            </tr>

                        </thead>


                        <tbody>

                            {conversations.map(
                                (conversation) => (

                                    <tr
                                        key={
                                            conversation.id
                                        }
                                    >

                                        <td>
                                            {conversation.id}
                                        </td>

                                        <td>
                                            {
                                                conversation.student_name
                                            }
                                        </td>

                                        <td>
                                            {
                                                conversation.alumni_name
                                            }
                                        </td>

                                        <td>
                                            {new Date(
                                                conversation.created_at
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}
                                        </td>

                                        <td>
                                            {new Date(
                                                conversation.updated_at
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </>

    );

}


export default ConversationReport;