import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./component/UserContext";
import Login from "./screens/Login/Login"
import Resource from "./screens/Resource";
import ResourceInfo from './screens/ResourceInfo/ResourceInfo'
import WebAccess from "./screens/WebAccess";
import AnomalyDetection from "./screens/AnomalyDetection/AnomalyDetection";
import WebScanning from "./screens/WebScanning/WebScanning";
import Report from "./screens/Report/Report";
import Title from "./component/Title";
import Sidebar1 from "./component/Sidebar1";
import Sidebar2 from "./component/Sidebar2";

const App = () => {
  return (
    <div className='App' >
      <BrowserRouter>
        <UserProvider>
          <Title />
          <div className='center'>
            <div className='bar'>
              <Sidebar1 />
              <Sidebar2 />
            </div>
            <Routes className="dashboard">
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Resource />} />
              <Route path="/resource_info" element={<ResourceInfo />} />
              <Route path="/webaccess" element={<WebAccess />} />
              <Route path="/anomalydetection" element={<AnomalyDetection />} />
              <Route path="/webscanning" element={<WebScanning />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </div>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
