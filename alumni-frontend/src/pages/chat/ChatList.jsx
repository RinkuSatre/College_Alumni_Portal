import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Chat.css";

function ChatList() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [conversations, setConversations] = useState([]);

    useEffect(() => {

        fetchChats();

    }, []);

    const fetchChats = async () => {

        try {

            const response = await API.get(
                "chat/"
            );

            setConversations(
                response.data.results || response.data
            );

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <>

            <Sidebar />

            <Topbar />

            <div className="chat-container">

                <h2>

                    💬 Chats

                </h2>

                {

                    conversations.length === 0 ?

                    (

                        <div className="empty-chat">

                            No Conversations Yet

                        </div>

                    )

                    :

                    (

                        conversations.map((chat)=>(

                            <Link
                                key={chat.id}
                                to={`/chat/${chat.id}`}
                                className="chat-card"
                            >

                                <h3>

                                    {

                                        user.role === "student"

                                        ?

                                        chat.alumni_name

                                        :

                                        chat.student_name

                                    }

                                </h3>

                                <p>

                                    {

                                        chat.messages.length > 0

                                        ?

                                        chat.messages[
                                            chat.messages.length-1
                                        ].message

                                        :

                                        "Start Conversation"

                                    }

                                </p>

                            </Link>

                        ))

                    )

                }

            </div>

        </>

    );

}

export default ChatList;