import { useEffect, useState } from "react";

import API from "../../api/axios";


function QuestionReport() {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchQuestions();

    }, []);


    const fetchQuestions = async () => {

        try {

            const response = await API.get(
                "reports/questions/"
            );

            setQuestions(response.data);

        } catch (error) {

            console.log(
                "Question Report Error:",
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
                        ❓ Question Report
                    </h2>

                    <p>
                        Total Questions: {questions.length}
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

            ) : questions.length === 0 ? (

                <p className="loading-text">
                    No questions found.
                </p>

            ) : (

                <div className="report-table-container">

                    <table className="report-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>User</th>
                                <th>Question Title</th>
                                <th>Category</th>
                                <th>Created Date</th>

                            </tr>

                        </thead>


                        <tbody>

                            {questions.map((question) => (

                                <tr key={question.id}>

                                    <td>
                                        {question.id}
                                    </td>

                                    <td>
                                        {question.user_name}
                                    </td>

                                    <td>
                                        {question.title}
                                    </td>

                                    <td>
                                        {question.category}
                                    </td>

                                    <td>
                                        {new Date(
                                            question.created_at
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


export default QuestionReport;