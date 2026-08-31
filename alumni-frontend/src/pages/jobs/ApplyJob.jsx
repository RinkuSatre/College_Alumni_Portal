import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplyJob.css";


function ApplyJob() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [resume, setResume] = useState(null);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (!resume) {

            alert("Please upload your resume");

            return;

        }


        const formData = new FormData();

        formData.append(
            "resume",
            resume
        );


        try {

            const token = localStorage.getItem("access");


            const response = await axios.post(

                `http://127.0.0.1:8000/api/jobs/${id}/apply/`,

                formData,

                {
                    headers: {

                        Authorization: `Bearer ${token}`,

                        "Content-Type": "multipart/form-data"

                    }

                }

            );


            alert("Application Submitted Successfully!");


            console.log(response.data);


            navigate("/");


        }
        catch(error) {

            console.log(error.response?.data);

            alert("Application Failed");

        }

    };



    return (

        <div className="apply-container">


            <h2>
                Apply For Job
            </h2>


            <form onSubmit={handleSubmit}>


                <label>
                    Upload Resume
                </label>


                <input

                    type="file"

                    accept=".pdf,.doc,.docx"

                    onChange={(e) => 
                        setResume(e.target.files[0])
                    }

                />


                <button type="submit">

                    Submit Application

                </button>


            </form>


        </div>

    );

}


export default ApplyJob;