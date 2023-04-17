import React from 'react';
import { format } from 'date-fns';
import { ListItem, ListItemText, Typography, Card, CardContent, CardHeader } from '@mui/material';

const MessageItem = ({ message }) => {
   
    const messageTextTrim = message.text.trim()
  
    const formattedText = messageTextTrim.split('\n').map((line, index) => (<React.Fragment key={index}>
        {line}
        <br />
    </React.Fragment>))

    return (
        <ListItem key={message.id}>
            <Card sx={{
                width: '80%',
                height: 'auro',
                borderRadius: '15px',
                marginBottom: '10px',
                padding: '5px'
            }}>
                <Typography variant="body2" color="textSecondary" align="right">
                    {format(new Date(message.createdAt), 'MM/dd/yyyy HH:mm')}
                </Typography>
                <CardHeader
                    title={message.name}
                    titleTypographyProps={{ variant: 'body2', fontWeight: 'bold', textAlign: 'left' }}
                    sx={{ pb: 0 }}
                />
                <CardContent>
                    <ListItemText
                        secondary={formattedText}
                        secondaryTypographyProps={{ component: 'div' }}
                    />
                </CardContent>
            </Card>
        </ListItem>
    )
}

export default MessageItem;