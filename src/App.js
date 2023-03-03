import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Setting from './components/setting';
import Dashboardpage from './pages/UserDashboard/dashboard';
import Dashboards from './pages/HR/Dashboard';
import LeaveRequests from './pages/Admin/leaveRequest';
import ApplyLeave from './pages/UserDashboard/applyLeave';
import Profile from './pages/UserDashboard/profile';
import Leaves from './pages/UserDashboard/leaves';
import AddUser from './pages/UserDashboard/adduser';
import LeaveRequest from './pages/HR/leaveRequest';
import Comment from './pages/utils/comment';
import Event from './pages/HR/Event';
import Invite from './pages/HR/invite';
import AddProjectPage from './pages/HR/addproject';
import AddTeamPage from './pages/HR/addteam';
import Loader from './loader/loader';
import EmployeeList from './pages/HR/employeeList';
import { createContext, useState } from "react";

export const LoaderContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  const showLoader = () => {
    setLoading(true)
  }
  const hideLoader = () => {
    setLoading(false)
  }
  if (loading) {
    document.body.classList.toggle('overflowhidden', loading);
  }
  else {
    document.body.classList.remove('overflowhidden', loading);
  }

  return (

    <div className="App">
      <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        {/* {loading ? <Loader /> :
          <> */}
        <Loader value={loading} />
        <BrowserRouter>
          <div className='App'>
            <div>
              <Routes>
                {/* <Route path="/" element={<Signup />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboardpage" element={<Dashboards />} />
                <Route path="/dashboard" element={<Dashboardpage />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                <Route path="/setting" element={<Setting />} />
                <Route path="/applyleave" element={<ApplyLeave />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/leaves" element={<Leaves />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/leaverequest" element={<LeaveRequest />} />
                <Route path="/comments" element={<Comment />} />
                <Route path="/event" element={<Event />} />
                <Route path="/invite" element={<Invite />} />
                <Route path="/addproject" element={<AddProjectPage />} />
                <Route path="/project/:code" element={<AddTeamPage />} />
                <Route path="/Admin_leave_request" element={<LeaveRequests />} />
                <Route path="/employee_list" element={<EmployeeList />} />
              </Routes>
            </div>

          </div>
        </BrowserRouter>
        {/* </>
        } */}

      </LoaderContext.Provider>




    </div >
  );
}

export default App;