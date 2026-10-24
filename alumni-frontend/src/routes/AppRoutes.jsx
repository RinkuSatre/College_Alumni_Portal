import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import AlumniDashboard from "../pages/dashboard/AlumniDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import AlumniProfile from "../pages/profile/AlumniProfile";
import StudentProfile from "../pages/profile/StudentProfile";
import NotFound from "../pages/NotFound";

import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import EditJob from "../pages/jobs/EditJob";
import CreateJob from "../pages/jobs/CreateJob";
import ApplyJob from "../pages/jobs/ApplyJob";
import Applicants from "../pages/jobs/Applicants";
import MyApplications from "../pages/jobs/MyApplications";

import Events from "../pages/events/Events";
import EventDetails from "../pages/events/EventDetails";
import CreateEvent from "../pages/events/CreateEvent";
import EditEvent from "../pages/events/EditEvent";
import EventParticipants from "../pages/events/EventParticipants";
import MyEvents from "../pages/events/MyEvents";

import Forum from "../pages/forum/Forum";
import CreateQuestion from "../pages/forum/CreateQuestion";
import ForumDetails from "../pages/forum/ForumDetails";
// import QuestionDetails from "./pages/forum/QuestionDetails";
import EditQuestion from "../pages/forum/EditQuestion";
import EditAnswer from "../pages/forum/EditAnswer";
import MyQuestions from "../pages/forum/MyQuestions";

import ChatList from "../pages/chat/ChatList";
import StartChat from "../pages/chat/StartChat";
import ChatRoom from "../pages/chat/ChatRoom";

import Reports from "../pages/reports/Reports";


import Notification from "../pages/notifications/Notification";

import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

import Rewards from "../pages/rewards/Rewards";

import Feedback from "../pages/feedback/Feedback";
import AdminFeedback from "../pages/feedback/AdminFeedback";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/student/dashboard"element={<StudentDashboard />}/>
        <Route path="/alumni/dashboard"element={<AlumniDashboard />}/>
        <Route path="/admin/dashboard"element={<AdminDashboard />}/>
        
        {/* Profile */}
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/alumni/profile" element={<AlumniProfile />} />

        {/* jobs */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/jobs/:id/edit"element={<EditJob />}/>
        <Route path="/jobs/create"element={<CreateJob />}/>
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/jobs/:id/applicants"element={<Applicants />}/>
        <Route path="/jobs/my-applications"element={<MyApplications />}/>

       
       

        {/* events */}
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />}/>
        <Route path="/events/create" element={<CreateEvent />}/>
        <Route path="/events/:id/edit" element={<EditEvent />}/>
        <Route path="/events/:id/participants" element={<EventParticipants />}/>
        <Route path="/events/my-events" element={<MyEvents />}/>


        {/* forum */}
        <Route path="/forum"element={<Forum />}/>
        <Route path="/forum/create" element={<CreateQuestion />}/>
        <Route path="/forum/:id" element={<ForumDetails />}/>
        {/* <Route path="/forum/:id" element={<QuestionDetails />}/> */}
        <Route path="/forum/:id/edit" element={<EditQuestion />}/> 
        <Route path="/forum/answer/:id/edit" element={<EditAnswer />}/>
        <Route path="/forum/my-questions"element={<MyQuestions />}/>

        {/* chat */}
        <Route path="/chat" element={<ChatList />}/>
        <Route path="/chat/start" element={<StartChat />}/>
        <Route path="/chat/:id" element={<ChatRoom />}/>

        {/* notification */}
        <Route path="/notifications" element={<Notification />}/>

        {/* reports */}
        <Route path="/admin/reports" element={<Reports />} />

        {/* user manage */}
        <Route path="/admin/users" element={<Users />}/>
        <Route path="/admin/settings" element={<Settings />}/>

        <Route path="/rewards" element={<Rewards />}/>

        {/* feedback */}
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/feedback" element={<AdminFeedback />} />

        
        {/* 404 */}
        <Route path="*" element={<NotFound />} /></Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;