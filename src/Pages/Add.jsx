import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Add = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigete = useNavigate()

    const hendelSubmit = async (e) => {
        e.preventDefault();

        try {
            const record = await axios.post('http://localhost:8000/api/v1/addUser', {
                name: name,
                email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await record.data;
            console.log(data);
            alert('User Added Successfully');
            navigete('/')

        } catch (error) {
            console.log(error);
            return false;
        }

    }
    return (
        <>
            <div>
                <h1>Add</h1>

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

export default Add
