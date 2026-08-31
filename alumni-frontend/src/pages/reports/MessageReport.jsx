import { useEffect, useState } from "react";

import API from "../../api/axios";


function MessageReport() {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchMessages();

    }, []);


    const fetchMessages = async () => {

        try {

            const response = await API.get(
                "reports/messages/"
            );

            setMessages(response.data);

        } catch (error) {

            console.log(
                "Message Report Error:",
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
                        💬 Message Report
                    </h2>

                    <p>
                        Total Messages: {messages.length}
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

            ) : messages.length === 0 ? (

                <p className="loading-text">
                    No messages found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Conversation</th>
                                <th>Sender</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Created Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {messages.map((msg) => (

                                <tr key={msg.id}>

                                    <td>
                                        {msg.id}
                                    </td>

                                    <td>
                                        #{msg.conversation_id}
                                    </td>

                                    <td>
                                        {msg.sender_name}
                                    </td>

                                    <td className="message-cell">
                                        {msg.message}
                                    </td>

                                    <td>
                                        {msg.is_seen
                                            ? "Seen"
                                            : "Unread"}
                                    </td>

                                    <td>
                                        {new Date(
                                            msg.created_at
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


export default MessageReport;