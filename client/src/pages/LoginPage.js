import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {TextField} from '@material-ui/core'
import { toast } from 'react-toastify';



export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials:'include'
    });
    const result = await response.json();
    if(result.data){
       localStorage.setItem("user",username)
    }
    // alert(result.message)
    // if(result.success){
    //   return navigate('/')
    // }else{
    //   return navigate('/login')
    // }

    if (result.success) {
      toast.success("Login Successfully !", {
          closeButton: false
      })
     return navigate('/')
  } else {
      toast.error(result.message, {
          closeButton: false
      })
  }
  }
  return (
    <form className="login" onSubmit={login} style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center"}}>
      <h1>Login</h1>
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
      <button>Login</button>
    </form>
  );
}