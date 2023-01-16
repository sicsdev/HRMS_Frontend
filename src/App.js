
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Component/login";
import Signup from './Component/signUp';
import Dashboard from './Component/dashboard';
import Setting from './Component/setting';
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
                {/* <Route path="/navbar" element={<Navbar/>}/>
                <Route path="/sidebar" element={<Sidebar/>}/>
                 */}
              </Routes>
             

          </div>  

    </div>
    </BrowserRouter> 

    </div>
  );
}

export default App;
