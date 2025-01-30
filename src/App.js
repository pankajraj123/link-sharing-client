import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";


function App() {
  return (
    <>
       <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
       </Routes>
    </>
  );
}

export default App;

