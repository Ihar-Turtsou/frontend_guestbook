import { Typography } from '@mui/material';

const Notification = ({ message, type }) => {
  const color = type === 'error' ? 'error' : 'success.main';

  return (
    <Typography
      variant="body1"
      color={color}
      sx={{
        position: 'absolute',
        top: '-60px',
        left: '150px',
        zIndex: 2,
      }}
    >
      {message}
    </Typography>
  );
};

export default Notification;