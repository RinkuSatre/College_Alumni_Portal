import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import logo from "../../assets/images/yspm-logo.png";

import StudentReport from "./StudentReport";
import AlumniReport from "./AlumniReport";
import JobReport from "./JobReport";
import JobApplicationReport from "./JobApplicationReport";
import EventReport from "./EventReport";
import EventRegistrationReport from "./EventRegistrationReport";
import QuestionReport from "./QuestionReport";
import AnswerReport from "./AnswerReport";
import RewardPointReport from "./RewardPointReport";
import NotificationReport from "./NotificationReport";
import ConversationReport from "./ConversationReport";
import MessageReport from "./MessageReport";

import "./Reports.css";


function Reports() {

    const [reportType, setReportType] = useState("students");


    return (

        <>

            <Sidebar />

            <Topbar />


            <div className="reports-container">


                {/* ================= COLLEGE HEADER ================= */}

                <div className="college-header">

                    <img
                        src={logo}
                        alt="YSPM Logo"
                        className="college-logo"
                    />


                    <div className="college-details">

                        <h4>
                            Yashoda Shikshan Prasarak Mandal’s
                        </h4>

                        <h1>
                            YASHODA TECHNICAL CAMPUS, SATARA
                        </h1>

                        <h3>
                            FACULTY OF COMPUTER APPLICATION
                        </h3>

                        <h2>
                            Department of Master of Computer Application
                        </h2>

                    </div>

                </div>


                {/* ================= REPORT SELECT ================= */}

                <div className="report-selector">

                    <button
                        className={
                            reportType === "students"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("students")
                        }
                    >
                        👨‍🎓 Students
                    </button>


                    <button
                        className={
                            reportType === "alumni"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("alumni")
                        }
                    >
                        👨‍💼 Alumni
                    </button>


                    <button
                        className={
                            reportType === "jobs"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("jobs")
                        }
                    >
                        💼 Jobs
                    </button>

                    <button
                        className={
                            reportType === "job-applications"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("job-applications")
                        }
                    >
                        📋 Applications
                    </button>

                    <button
                        className={
                            reportType === "events"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("events")
                        }
                    >
                        📅 Events
                    </button>


                    <button
                        className={
                            reportType === "event-registrations"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("event-registrations")
                        }
                    >
                        📝 Event Registrations
                    </button>

                    <button
                        className={
                            reportType === "questions"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("questions")
                        }
                    >
                        ❓ Questions
                    </button>


                    <button
                        className={
                            reportType === "answers"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("answers")
                        }
                    >
                        💬 Answers
                    </button>

                    <button
                        className={
                            reportType === "rewards"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("rewards")
                        }
                    >
                        ⭐ Rewards
                    </button>

                    <button
                        className={
                            reportType === "notifications"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("notifications")
                        }
                    >
                        🔔 Notifications
                    </button>

                    <button
                        className={
                            reportType === "conversations"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("conversations")
                        }
                    >
                        💬 Conversations
                    </button>

                    <button
                        className={
                            reportType === "messages"
                                ? "active-report"
                                : ""
                        }
                        onClick={() =>
                            setReportType("messages")
                        }
                    >
                        💬 Messages
                    </button>

                </div>


                {/* ================= SELECTED REPORT ================= */}

                {reportType === "students" && (
                    <StudentReport />
                )}


                {reportType === "alumni" && (
                    <AlumniReport />
                )}


                {reportType === "jobs" && (
                    <JobReport />
                )}

                {reportType === "job-applications" && (
                    <JobApplicationReport />
                )}

                {reportType === "events" && (
                    <EventReport />
                )}

                {reportType === "event-registrations" && (
                    <EventRegistrationReport />
                )}

                {reportType === "questions" && (
                    <QuestionReport />
                )}

                {reportType === "answers" && (
                    <AnswerReport />
                )}

                {reportType === "rewards" && (
                    <RewardPointReport />
                )}

                {reportType === "notifications" && (
                    <NotificationReport />
                )}

                {reportType === "conversations" && (
                    <ConversationReport />
                )}
                 
                {reportType === "messages" && (
                    <MessageReport />
                )}


            </div>

        </>

    );
}


export default Reports;