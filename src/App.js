
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Component/login";
import Signup from './Component/signUp';
import Dashboard from './Component/dashboard';
import Setting from './Component/setting';
import Userdashboard from './Component/UserDashboard';
import ApplyLeave from './pages/UserDashboard/applyLeave';
import Leaves from './pages/UserDashboard/leaves';
import AddUser from './pages/UserDashboard/adduser';
import Profile from './pages/UserDashboard/profile';
import LeaveStatus from './pages/UserDashboard/leaveStatus';
import LeaveRequest from './pages/Admin/leaveRequest';
function App() {

  return (
    <div className="App">
       <BrowserRouter>
    <div className='App'>
          <div>
                     
              <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Signup/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/setting" element={<Setting/>}/>
                <Route path="/userdashboard" element={<Userdashboard/>}/>
                <Route path="/leaves" element={<Leaves/>}/>
                <Route path="/applyleave" element={<ApplyLeave/>}/>
                <Route path="/adduser" element={<AddUser/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/leavestatus" element={<LeaveStatus/>}/>
                <Route path="/leaverequest" element={<LeaveRequest/>}/>
                 
              </Routes>
             

          </div>  

    </div>
    </BrowserRouter> 

    </div>
  );
}

export default App;
