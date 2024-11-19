import React from 'react';
import { dummy } from '../test/example.js';
import './QuickButton.css';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import IconButton from '@mui/material/IconButton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function QuickButton({ open, func, text }) {
  const [dial, setDial] = React.useState(false);
  const winsize = window.innerWidth + window.innerHeight;

  const handleClickOpen = () => setDial(true);
  const handleClose = () => setDial(false);

  const unlock = () => {
    dummy.empty[text] = !dummy.empty[text];
    // dummy.empty[text] = false // test
    setDial(false);
  };

  const isWideScreen = winsize > 1500;
  const isOpen = open[text];

  return (
    <List className="QB">
      <ListItemButton
        onClick={!isOpen ? () => func(open, text) : null}
        disableTouchRipple={isOpen}
        sx={{
          width: '97%',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          '& ul': { padding: 0 },
        }}
      >
        <div onClick={isOpen ? () => func(open, text) : null} className="btn">
          {text}
        </div>
        {isOpen ? (
          <ExpandLess sx={{ width: '100%' }} onClick={isOpen ? () => func(open, text) : null} />
        ) : (
          <ExpandMore onClick={isOpen ? () => func(open, text) : null} />
        )}
        <div className="heightttt" style={{ height: isOpen ? 0 : '20%' }} />
        <Collapse
          className="collapse"
          sx={{ overflow: 'auto' }}
          in={isOpen}
          timeout={{ enter: 600, exit: 200 }}
          unmountOnExit
        >
          <div className="test">
            {[0, 1, 2].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader sx={{ bgcolor: 'transparent' }}>
                    {`I'm sticky ${sectionId}`}
                  </ListSubheader>
                  {[0, 1, 2, 3, 4].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>
                      <Stack direction="row" spacing={2}>
                        <Button
                          sx={{
                            bgcolor: 'white',
                            color: '#2e3440',
                          }}
                          variant="contained"
                          size="large"
                        >
                          10:00
                        </Button>
                        <Button
                          sx={{
                            bgcolor: 'white',
                          }}
                          variant="outlined"
                          size="large"
                        >
                          10:30
                        </Button>
                      </Stack>
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </div>
          <div style={{ height: '80px' }} />
        </Collapse>
      </ListItemButton>
      <div className="icon">
        <IconButton 
        // disabled={dummy.empty[text]} //test
        aria-label="Example" onClick={handleClickOpen}>
          {dummy.empty[text] ? (
            <LockOutlinedIcon
              fontSize={isWideScreen ? 'large' : 'medium'}
              sx={{ color: '#e91e63' }}
            />
          ) : (
            <LockOpenOutlinedIcon
              fontSize={isWideScreen ? 'large' : 'medium'}
              sx={{ color: '#9dd52d' }}
            />
          )}
        </IconButton>
      </div>
      <Dialog open={dial} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"테스트용"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            테스트용 잠겨있을땐 터치 비활성화할 예정
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={unlock} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}

export default QuickButton;
