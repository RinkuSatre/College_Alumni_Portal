import { useEffect, useState } from "react";

import API from "../../api/axios";


function AnswerReport() {

    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchAnswers();

    }, []);


    const fetchAnswers = async () => {

        try {

            const response = await API.get(
                "reports/answers/"
            );

            setAnswers(response.data);

        } catch (error) {

            console.log(
                "Answer Report Error:",
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
                        💬 Answer Report
                    </h2>

                    <p>
                        Total Answers: {answers.length}
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

            ) : answers.length === 0 ? (

                <p className="loading-text">
                    No answers found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Accepted</th>
                                <th>Created Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {answers.map((answer) => (

                                <tr key={answer.id}>

                                    <td>
                                        {answer.id}
                                    </td>

                                    <td>
                                        {answer.user_name}
                                    </td>

                                    <td>
                                        {answer.question_title}
                                    </td>

                                    <td>
                                        {answer.answer}
                                    </td>

                                    <td>
                                        {answer.is_accepted
                                            ? "Yes"
                                            : "No"}
                                    </td>

                                    <td>
                                        {new Date(
                                            answer.created_at
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


export default AnswerReport;