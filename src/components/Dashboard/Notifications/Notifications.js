import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/api/notifications');
                setNotifications(response.data);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
            <Sidebar />  {/* Sidebar now without any additional div wrapping or width setting */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: 'white', color: 'black' }}>
                <h2 style={{ borderBottom: '2px solid gray', paddingBottom: '10px', color:'black'}}>Notifications</h2>
                {notifications.length > 0 ? (
                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        {notifications.map((notification, index) => (
                            <li key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                {notification.message} - <small>{new Date(notification.date).toLocaleString()}</small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No notifications to show.</p>
                )}
            </div>
        </div>
    );
}

export default Notifications;