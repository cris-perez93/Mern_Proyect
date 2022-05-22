import { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import styled from 'styled-components'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'


const Form = styled.form`
 display: flex;
 flex-direction:column ;
 
`
const Camp = styled.div`
display:flex ;
flex-direction:column ;
gap:5px;
padding:10px;
`


function App() {
  const [open, setOpen] = useState(true)

  //state para registro
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

 
  const handleSubmit= async  (e) =>{
    
    if(nombre === '' || email === '' || password === ''){
      setError(true)
      return;
    }
    try {
      
      const res = await axios.post('http://localhost:4000/api/usuarios', {
        nombre,
        email,
        password
      })
      console.log(res)
      setOpen(false)
    

      } catch (error) {
      console.log(error)
      
    }


  
  }


  return (
    <Modal center open={open}>
        
        <Form onSubmit={handleSubmit}>
          <h1>Regisrate</h1>
          <Camp>
          <label>Nombre</label>
          <TextField
            variant="outlined" 
            type="text"
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Enter your name"
            />
          </Camp>
          
          <Camp>
          <label>Email</label>
          <TextField 
            variant="outlined"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            />
          </Camp>
          <Camp>
          <label>Password</label>
          <TextField 
            variant="outlined"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            />
          </Camp>
          <Camp>
          <Button type= 'submit' variant="contained">Register</Button>
          </Camp>
        </Form>
        {error ?  <p>Todos los campos son obligatorios</p> : null}

    </Modal>
  )
}

export default App
