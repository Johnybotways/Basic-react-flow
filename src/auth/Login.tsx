import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import { Alert } from '@mantine/core';

const Login : React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            // console.log("Hit fetch")
            const response = await fetch("http://localhost:8090/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({username, password}),
            });
            // console.log("Fetch ends")
            
            const data = await response.json();
            console.log(response)
            if (data.error) {
               setAlert(true);
            } else if (response.status === 405) {
                setAlert(true);
            }
            else {
                navigate("/dashboard")
            }
        }catch (error : any){
            setAlert(true);
        }

        const onAlert = () => {
            
            return <>
                    <Alert variant="light" color="red" withCloseButton title="Login Failed">
                Failed to Login, please check your Username and password.
        </Alert>
            </>
        }

        setAlert(false);

        
    };

  return (
    <div>
        <h2>
            Login
        </h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username: </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type='submit'>Login</button>
        </form>
        {alert && }
    </div>
  )
}

export default Login;