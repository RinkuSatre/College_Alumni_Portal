import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Chat.css";

function StartChat() {

    const navigate = useNavigate();

    const [alumni, setAlumni] = useState([]);

    useEffect(() => {

        fetchAlumni();

    }, []);

    const fetchAlumni = async () => {

        try {

            const response = await API.get(
                "profiles/alumni-list/"
            );

            setAlumni(
                response.data.results || response.data
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    const startChat = async (id) => {

        try {

            const response = await API.post(
                "chat/start/",
                {
                    alumni: id
                }
            );

            alert("✅ Conversation Started");

            navigate(`/chat/${response.data.id}`);

        }

        catch (error) {

            alert(
                error.response?.data?.detail ||
                "Conversation already exists."
            );

        }

    };

    return (

        <>
            <Sidebar />
            <Topbar />

            <div className="chat-container">

                <h2>👨‍🎓 Alumni Directory</h2>

                {

                    alumni.map((item)=>(

                        <div
                            className="chat-card"
                            key={item.user_id}
                        >

                            <h3>
                                {item.full_name}
                            </h3>

                            <p>
                                {item.company_name}
                            </p>

                            <p>
                                {item.job_title}
                            </p>

                            <button
                                className="start-chat-btn"
                                onClick={() =>
                                    startChat(item.user_id)
                                }
                            >
                                💬 Start Chat
                            </button>

                        </div>

                    ))

                }

            </div>

        </>

    );

}

export default StartChat;