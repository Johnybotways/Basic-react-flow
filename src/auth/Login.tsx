import React, { useState }  from 'react'
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import { Alert, Input, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
const onAlert = () => {

    // console.log(<Alert/>)
            
    return <>
            <Alert variant="light" color="red" withCloseButton={false} title="Login Failed" >
        Failed to Login, please check your Username and password.
</Alert>

    </>


}

const Login : React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alert, setAlert] = useState<boolean>(false);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    console.log(opened)
    console.log(open)
    console.log(close)
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
            // console.log(response)
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
    }
        

  return (
    <div>
        <h2>
            Login
        </h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email: </label>
                <Input
            type="email"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            className="mt-3"
            style={{"margin-top" : "5px"}}
          />
                {/* <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> */}
            </div>
            <div style={{"margin-top" : "15px"}}>
                <label htmlFor="" >Password: </label>
                <Input style={{"margin-top" : "5px"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"
            className="mt-3"/>
            </div>
            
            <Button  type='submit' style={{"margin-top" : "10px"}}>Login</Button ><span>  </span>
            <Button style={{"margin-top" : "10px"}} onClick={open}>Forget Password</Button >
        </form>
        
        <Modal opened={opened} onClose={close} title="Forget Password">
            <form>
        <Input
            type="email"
            required
            placeholder="Enter your email"
            className="mt-3"
            style={{"margin-top" : "5px"}}
          />
          <br />
          <br />
          <h3>We will send you a password reset link</h3>
          <br />
        <Button type='submit' style={{"margin-top" : "10px"}} onClick={close}>Get Link</Button >
        </form>
      </Modal>
        {alert && onAlert()}
    </div>
  )
}

export default Login;