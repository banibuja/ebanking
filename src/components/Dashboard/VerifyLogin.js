import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function VerifyLogin() {
    const [role, setRole] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('http://localhost:8080')
            .then(res => {
                if (res.data.valid) {
                    setRole(res.data.role);
                    if (res.data.role != 'Admin') navigate('/dashboard');
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err))
    }, []);
}