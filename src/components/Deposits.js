import React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 July, 2023
      </Typography>
      <div>
        <Typography color="primary" sx={{ cursor: 'pointer' }} onClick={preventDefault}>
          View balance
        </Typography>
      </div>
    </React.Fragment>
  );
}
