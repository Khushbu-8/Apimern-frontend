import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Edit = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigete = useNavigate()
    const location = useLocation()
   
    

    const hendelSubmit = async(e) =>{
        e.preventDefault();

        try {
            const record = await fetch(`https://apimern-backend.vercel.app/api/v1/updateUser`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id:location?.state?._id,
                    name:name,
                    email:email,
                    password:password
                    })
            })
            const data = await record.json();
                // console.log(data);
                alert('User Update Successfully');
                navigete('/')

        } catch (error) {
            console.log(error);
            return false;
        }

    }
    useEffect(()=>{
        setName(location?.state?.name)
        setEmail(location?.state?.email)
        setPassword(location?.state?.password)
    },[location?.state])
  return (
   <>
    <div>
      <h1>Edit</h1>

      <form action="" onSubmit={hendelSubmit}>
        <table border={1}>
            <tr>
                <td>Name :</td>
                <td><input type="text" onChange={(e) => setName(e.target.value)} value={name} /></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><input type="text" onChange={(e) => setEmail(e.target.value)} value={email} /></td>
            </tr>
            <tr>
                <td>Name :</td>
                <td><input type="text" onChange={(e) => setPassword(e.target.value)} value={password} /></td>
            </tr>
            <tr>
                <td></td>
                <td><input type="submit" /></td>
            </tr>
        </table>
      </form>
      </div>
   </>
  )
}

export default Edit
