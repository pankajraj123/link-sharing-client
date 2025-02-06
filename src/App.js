import Dashboard from "./pages/Dashboard";
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Forgot from "./components/Forgot";
import ResetPassword from "./components/ResetPassword";
import ResourceShow from './pages/ResourceShow';


function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/dashboard/topicDescription/:formattedTopicName' element={<ResourceShow/>}></Route>
        <Route path='/forgotpassword' element={<Forgot/>}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
       </Routes>
    </>
  );
}

export default App;

