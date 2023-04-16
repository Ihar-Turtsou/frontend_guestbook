import React, { useState } from 'react';
import { isValidName, containsHyperlink } from './ValidationForm.js'
import { Button, TextField, Box } from '@mui/material';

const MessageForm = ({ onSubmit, onError, onSuccess, onServerError }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (containsHyperlink(name) || containsHyperlink(text)) {
            onError('Hyperlinks are not allowed in form fields.');
            return;

        }
        if (!isValidName(name)) {
            onError('Only Latin characters, numbers, underscores are allowed in the name');
            return;
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, text }),
        };

        try {
            const response = await fetch("http://localhost:4000/messages", requestOptions);
            if (response.ok) {
                const newMessage = await response.json();
                onSubmit(newMessage.message);
                setText('');
                onError(null);
                onSuccess('Message sent successfully');
            } else {
                const errorData = await response.json();
                onError(errorData.errors[0].msg);
            };
        } catch (error) {
            onServerError('Failed to send message');
        }
    };

    const handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box mb={2} sx={{ width: '80%' }}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={name}
                    inputProps={{ style: { whiteSpace: 'pre-wrap' } }}
                    onChange={(e) => setName(e.target.value)}
                    onInput={() => onError(null)}
                    sx={{
                        '@media (min-width: 1000px)': {
                            width: '50%',
                        },
                    }}
                />
            </Box>
            <Box mb={2} sx={{ width: '80%' }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    variant="outlined"
                    value={text}
                    inputProps={{ style: { whiteSpace: 'pre-wrap' } }}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onInput={() => onError(null)}
                    sx={{
                        '@media (min-width: 1000px)': {
                            width: '50%',
                        },
                    }}
                />
            </Box>
            <Button variant="contained" color="primary" type="submit" mb={2}>
                Send
            </Button>
        </form>
    );
};

export default MessageForm;
