import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import API from "../../api/axios";

import "./Chat.css";

function ChatRoom() {

    const { id } = useParams();

    const currentUser = JSON.parse(
        localStorage.getItem("user")
    );

    const [conversation, setConversation] = useState(null);

    const [message, setMessage] = useState("");
    
    const messagesEndRef = useRef(null);

    useEffect(() => {

        fetchConversation();

        const interval = setInterval(() => {

            fetchConversation();

        }, 3000);

        return () => clearInterval(interval);

    }, [id]);


    useEffect(() => {

        fetchConversation();
        const interval = setInterval(() => {

            fetchConversation();

        }, 3000);

        return () => clearInterval(interval);

    }, [id]);

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [conversation]);

    const fetchConversation = async () => {

        try {

            const response = await API.get(`chat/${id}/`);

            setConversation(response.data);

            for (const msg of response.data.messages) {

                    if (
                        msg.sender_name !== currentUser.username &&
                        !msg.is_seen
                    ) {

                        try {

                            await API.patch(
                                `chat/message/${msg.id}/seen/`
                            );

                        }

                        catch (error) {

                            console.log(error);

                        }

                    }

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    const sendMessage = async (e) => {

        e.preventDefault();

        if (!message.trim()) return;

        try {

            await API.post(`chat/${id}/send/`, {

                message: message

            });

            setMessage("");

            fetchConversation();

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Sidebar />
            <Topbar />

            <div className="chat-room">

                <h2>💬 Chat</h2>

                <div className="messages-box">

                    {conversation?.messages.map((msg) => (

                        <div
                            key={msg.id}
                            className={
                                msg.sender_name === currentUser.username
                                    ? "my-message"
                                    : "other-message"
                            }
                        >

                            <strong>{msg.sender_name}</strong>

                            <p>{msg.message}</p>

                            <small className="message-time">

                                {new Date(msg.created_at).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}

                            </small>

                            {msg.sender_name === currentUser.username && (

                                <small className="seen-status">

                                    {msg.is_seen ? "✓ Seen" : "✓ Sent"}

                                </small>

                            )}

                        </div>

                    ))}

                    <div ref={messagesEndRef}></div>

                </div>

                <form
                    className="chat-form"
                    onSubmit={sendMessage}
                >

                    <input
                        type="text"
                        placeholder="Type message..."
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    />

                    <button type="submit">

                        Send

                    </button>

                </form>

            </div>

        </>

    );

}

export default ChatRoom;