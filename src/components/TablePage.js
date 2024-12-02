import * as React from 'react';
import { useState, useEffect } from 'react';
import { dummy } from '../test/example.js';
// import './Login.css';
import { db } from '../test/firebase';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid2';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';
import { Widgets } from '@mui/icons-material';

const docRef = doc(db, "test", "room");

const roomState = {0: '예약 가능', 1: '예약중', 2: '예약 불가'};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TablePage({user, setTablePageOpen, tablePageOpen}) {
  const [selectedDay, setSelectedDay] = useState('day1'); // 초기 선택된 날짜는 'day1'
  const [timetable, setTimetable] = useState(''); // 초기 선택된 날짜는 'day1'

  async function getTimetable() {
    const docSnap = await getDoc(docRef);

    setTimetable(docSnap.data());
    console.log(docSnap.data());
  };
  
  useEffect(() => { 
    getTimetable();
  },[]);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };
  const handleClose = () => {
    setTablePageOpen(false);
  };
  
  const times = Array.from({ length: 36 }, (_, i) => {
    const hour = String(Math.floor(6 + i / 2)).padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={tablePageOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ flexGrow: 1, padding: 1, display: 'flex', 
          flexDirection:'column', alignItems: 'center'}}>
          {/* 버튼 그룹 */}
          <ButtonGroup variant="contained" sx={{ marginBottom: 2 }}>
            <Button onClick={() => handleDayChange('day1')}>Day 1</Button>
            <Button onClick={() => handleDayChange('day2')}>Day 2</Button>
            <Button onClick={() => handleDayChange('day3')}>Day 3</Button>
          </ButtonGroup>

          <Grid container spacing={2}>
            {/* 시간 열 */}
            <Grid item xs={3}>
              <Typography variant="h6" align="center">
                시간
              </Typography>
              {times.map((time) => (
                <Box key={time} sx={{ padding: 1, borderBottom: '1px solid #ddd' }}>
                  <Typography align="center">{time}</Typography>
                </Box>
              ))}
            </Grid>

            {/* 그룹별 상태 열 */}
            {Object.entries(timetable).sort(([keyA], [keyB]) => keyA.localeCompare(keyB)).map(([key, days]) => (
              <Grid item xs={3} key={key}>
                <Typography variant="h6" align="center">
                  {key.toUpperCase()}
                </Typography>
                {days.Reserve[selectedDay].map((status, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: '65px',
                      padding: 1,
                      borderBottom: '1px solid #ddd',
                      backgroundColor:
                        status === 0
                          ? '#d4edda'
                          : status === 2
                          ? '#f8d7da'
                          : '#fff3cd',
                      color:
                        status === 0
                          ? '#155724'
                          : status === 2
                          ? '#721c24'
                          : '#856404'
                    }}
                  >
                    <Typography align="center">{status}</Typography>
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        
      </Dialog>
    </React.Fragment>
  );
}

export default TablePage;
