import StudentDashboard from "./StudentDashboard";
import AlumniDashboard from "./AlumniDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>Please Login</h2>;
  }

  if (user.role === "student") {
    return <StudentDashboard />;
  }

  if (user.role === "alumni") {
    return <AlumniDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <h2>Invalid Role</h2>;
}

export default Dashboard;