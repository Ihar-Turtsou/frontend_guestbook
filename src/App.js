import './App.css';
import React from 'react';
import MessageList from './components/MessageList.js';
import { AppBar, Toolbar, Typography, Container} from '@mui/material';

function App() {
  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6">
            Guest book
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ width: '100%', paddingTop: '16px' }}>
        <MessageList />
      </Container>
    </div>
  );
}

export default App;
