import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const View = () => {
    const [record,setRcord] = useState([])
    const navigete = useNavigate();

    const FetchData = async() =>{
        try {
            const record = await fetch(`https://apimern-backend.vercel.app/api/v1/viewUser`,{
                method: 'GET',
            })
            const data = await record.json()
           if(data.success){
             // console.log(data.users);
             setRcord(data.users);

           }

        } catch (error) {
            console.log(error);
            return false;   
        }
    }
   useEffect(() =>{
    FetchData();
   },[])

   const DeletUser = async(id) =>{
        try {
            const record = await fetch(`https://apimern-backend.vercel.app/api/v1/deleteUser?deleteid=${id}`,{
                method: 'DELETE',

            })
            const res = await record.json()
           if(res.success){
            alert("User deleted successfully");
            FetchData();
           }
            
        } catch (error) {
            console.log(error);
            
        }

   }


  return (
    <>
    <div>
    <div>
    <h1>View User</h1>
    </div>
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>SeNo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
{
    record.map((val,i) =>{
        const {_id,name,email,password} = val;
       return(
        <tr key={i}>
            <td>{_id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{password}</td>
            <td>
                <button onClick={() => DeletUser(_id)}>Delete</button> ||
                <button onClick={() => navigete(`/edit`,{state:val})}>Edit</button>
            </td>
        </tr>
       )
    })
}
        </tbody>
      </table>
      <Link to={'/add'}>Add</Link>
    </div>
      </div>
    </>
  )
}

export default View
