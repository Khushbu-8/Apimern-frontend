import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const View = () => {
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const FetchData = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetch(`https://apimern-backend.vercel.app/api/v1/viewUser `, {
                method: 'GET',
            });
            const data = await response.json();
            if (response.ok) {
                setRecord(data.users);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (error) {
            setError('An error occurred while fetching data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const DeletUser  = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`https://apimern-backend.vercel.app/api/v1/deleteUser ?deleteid=${id}`, {
                    method: 'DELETE',
                });
                const res = await response.json();
                if (response.ok) {
                    alert("User  deleted successfully");
                    FetchData(); // Refresh data after deletion
                } else {
                    alert(res.message || 'Failed to delete user');
                }
            } catch (error) {
                console.error(error);
                alert('An error occurred while deleting the user');
            }
        }
    };

    return (
        <>
            <div>
                <h1>View User</h1>
                {loading && <p>Loading users...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>SeNo</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {record.map((val, i) => {
                                const { _id, name, email } = val; // Removed password
                                return (
                                    <tr key={i}>
                                        <td>{_id}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>
                                            <button onClick={() => DeletUser (_id)}>Delete</button> ||
                                            <button onClick={() => navigate(`/edit`, { state: val })}>Edit</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Link to={'/add'}>Add</Link>
                </div>
            </div>
        </>
    );
};

export default View;