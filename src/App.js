
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Component/login";
import Signup from './Component/signUp';
import Dashboardpage from './pages/UserDashboard/dashboard';
import Dashboards from './pages/HR/Dashboard';
import Setting from './Component/setting';
import ApplyLeave from './pages/UserDashboard/applyLeave';
import Leaves from './pages/UserDashboard/leaves';
import AddUser from './pages/UserDashboard/adduser';
import Profile from './pages/UserDashboard/profile';
import LeaveStatus from './pages/UserDashboard/leaveStatus';
import LeaveRequest from './pages/HR/leaveRequest';
import Event from './pages/HR/Event';
import Imageupload from './pages/HR/imageupload';
import Invite from './pages/HR/invite';
import LeaveRequests from './pages/admin/leaverequest';
import AddProjectPage from './pages/HR/addproject';
import AddTeamPage from './pages/HR/addteam';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <div className='App'>
          <div>

            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/" element={<Signup />} /> */}
              <Route path="dashboardpage" element={<Dashboards />} />
              <Route path="/dashboard" element={<Dashboardpage />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/applyleave" element={<ApplyLeave />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leavestatus" element={<LeaveStatus />} />
              <Route path="/leaverequest" element={<LeaveRequest />} />
              <Route path="/event" element={<Event />} />
              <Route path="/image" element={<Imageupload />} />
              <Route path="/invite" element={<Invite />} />
              <Route path="/addproject" element={<AddProjectPage />} />
              <Route path="/project/:code" element={<AddTeamPage />} />
              <Route path="/Admin_leave_request" element={<LeaveRequests />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
