import React, { useState} from 'react';
import axios from 'axios';
import  {useNavigate,Link } from 'react-router-dom';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [checkcredential,setcheckcredential]=useState(false);
  const navigate = useNavigate();
 
   const handleforgot = async () => {
     console.log("sjabjd000");
     navigate('/forgotpassword');
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
     const data={
        email:email,
        password:password
     }

    try {
      const response = await axios.post('http://localhost:8000/loginuser', data);
      
    
      if(response.data.message =='user login sucessfully'){
        let items={
          username:response.data.username,
          token:response.data.token
        }
        localStorage.setItem('token', JSON.stringify(items));
        navigate('/dashboard')
      }
      else if(response.data=='login failed'){
        setcheckcredential(true);
      }else if(response.data=='user is not exist'){
        alert('user is not exist')
      }
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {checkcredential && (
          <div ><span className='bg-danger text-white'>wrong email or password</span></div>
        )}
         <div className=' d-flex  gap-3'>
         <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>  
        <button type="button" className="btn btn-primary" onClick={handleforgot}>
          Forgot password
        </button>
         </div>
      </form>
    </div>
  );
}

export default Login;

