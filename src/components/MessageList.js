import React, { useState, useEffect } from 'react';
import Notification from './Notification.js';
import MessageForm from './MessageForm.js';
import MessageItem from './MessageItem.js';
import { Box, List} from '@mui/material';

const MessageList = () => {
    
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [serverError, setServerError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(apiUrl)

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.errors[0].msg);
                    return;
                }

                const data = await response.json()
                setMessages(data)
            } catch (error) {
                console.log('Error fetching messages:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMessages()
    }, [apiUrl]);
  
    const handleInputChange = () => {
        setError(null);
        setSuccessMessage(null);
        setServerError(null);
      };


    if (isLoading) {
        return <div>Loading...</div>
    };

    return (
        <Box>
            <Box sx={{ marginLeft: '15px' }}>
                <MessageForm onSubmit={(newMessage) => setMessages([newMessage, ...messages])} 
                onError={setError} 
                onSuccess={setSuccessMessage} 
                onServerError={setServerError} 
                onInputChange={handleInputChange}
                />
            </Box>
            <Box sx={{ position: 'relative', marginTop: '20px' }}>
                {error && <Notification message={error} type="error" />}
                {successMessage && <Notification message={successMessage} type="success" />}
                {serverError && <Notification message={serverError} type="error" />}
                <List>
                    {messages.map((message) => (
                        <MessageItem key={message.id} message={message} />
                    ))}
                </List>
            </Box>
        </Box>
    )
};

export default MessageList;