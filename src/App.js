import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signUp';
import Dashboard from './components/dashboard';
import Setting from './components/setting';
import UserDashboard from './components/userDashboard';
import Team from './pages/UserDashboard/team';
import ApplyLeave from './pages/UserDashboard/applyLeave';
import Profile from './pages/UserDashboard/profile';
import Leaves from './pages/UserDashboard/leaves';
import AddUser from './pages/UserDashboard/adduser';
import LeaveStatus from './pages/UserDashboard/leaveStatus';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='App'>
          <div>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/userdashboard" element={<UserDashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/applyleave" element={<ApplyLeave />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/leavestatus" element={<LeaveStatus />} />
            </Routes>
          </div>

        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;