import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Routes,Route,BrowserRouter} from 'react-router-dom';


function App() {
  return (
    <>
     <div className="container ">
      <Header/>
      </div>
       <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
       </Routes>
    </>
  );
}

export default App;

{/* <div className="row flex-grow-1 align-items-center justify-content-end">
        <div className="col-md-4">
          <Login/>  
        </div>
      </div> */}