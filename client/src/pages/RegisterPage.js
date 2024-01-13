import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {TextField} from '@material-ui/core';
import {toast } from 'react-toastify';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials:'include'
    });
    const result = await response.json();
    // console.log(result);
    
    if(result.success){
      toast.success(result.message+" !",{
        closeButton:false
      })

      navigate('/login')
    }else{
      toast.error(result.message,{
        closeButton:false
      })
    }
  }

  return (
    <><form className="register" onSubmit={register} style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
      <h1>Register</h1>
      <TextField 
             label="username"
             variant="outlined"
             inputProps={{ style: { color: "white" } }}
             required
             value={username}
             type="text"
             InputLabelProps={{className: "textfield__label"}}
             onChange={ev => setUsername(ev.target.value)}/>
      <TextField type="password"
             label="password"
             variant="outlined"
             InputLabelProps={{className: "textfield__label"}}
             required
             value={password}
             onChange={ev => setPassword(ev.target.value)}/>
      <button>Register</button>
    </form>
    {/* <ToastContainer toastStyle={{ backgroundColor: "#050A30" }}/> */}
    </> );
}
