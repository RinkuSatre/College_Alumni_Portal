import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import "./Settings.css";

function Settings() {

    return (
        <>
            <Sidebar />

            <Topbar />

            <div className="settings-container">

                <div className="settings-header">
                    <h1>⚙️ Settings</h1>
                    <p>
                        Manage admin and system settings
                    </p>
                </div>


                <div className="settings-card">

                    <h2>Admin Settings</h2>

                    <div className="setting-item">

                        <div>
                            <h3>System Notifications</h3>
                            <p>
                                Enable notifications for important system activities.
                            </p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked
                            />
                            <span className="slider"></span>
                        </label>

                    </div>


                    <div className="setting-item">

                        <div>
                            <h3>User Registration</h3>
                            <p>
                                Allow new students and alumni to register.
                            </p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked
                            />
                            <span className="slider"></span>
                        </label>

                    </div>


                    <div className="setting-item">

                        <div>
                            <h3>Job Posting</h3>
                            <p>
                                Allow users to post new job opportunities.
                            </p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked
                            />
                            <span className="slider"></span>
                        </label>

                    </div>


                    <div className="setting-item">

                        <div>
                            <h3>Event Registration</h3>
                            <p>
                                Allow students and alumni to register for events.
                            </p>
                        </div>

                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked
                            />
                            <span className="slider"></span>
                        </label>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Settings;