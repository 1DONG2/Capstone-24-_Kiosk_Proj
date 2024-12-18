import * as React from 'react';
import { useState, useEffect } from 'react';
// import { dummy } from '../test/example.js';
// import './Login.css';
import { db } from '../test/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid2';
import { Box, Typography, Button, ButtonGroup } from '@mui/material';

const docRef = doc(db, "test", "room");

const roomName = {'A': '알파', 'B': '베타', 'C': '감마'};
const roomState = {0: '예약 가능', 1: '예약중', 2: '예약 불가'};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TablePage({user, setTablePageOpen, tablePageOpen, setReserveOpen}) {
  const [selectedDay, setSelectedDay] = useState('day1'); // 초기 선택된 날짜는 'day1'
  const [timetable, setTimetable] = useState(''); // 초기 선택된 날짜는 'day1'

  async function getTimetable() {
    const docSnap = await getDoc(docRef);

    setTimetable(docSnap.data());
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
        <AppBar sx={{ position: 'relative', bgcolor: '#092979' }}>
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
          flexDirection:'column', alignItems: 'center', bgcolor: '#ebedf0'}}>
          {/* 버튼 그룹 */}
          <ButtonGroup variant="contained" sx={{ marginBottom: 2}}>
            <Button sx={{ bgcolor: '#092979' }} onClick={() => handleDayChange('day1')}>Day 1</Button>
            <Button sx={{ bgcolor: '#092979' }} onClick={() => handleDayChange('day2')}>Day 2</Button>
            <Button sx={{ bgcolor: '#092979' }} onClick={() => handleDayChange('day3')}>Day 3</Button>
          </ButtonGroup>

          <Grid container spacing={0.5}>
            {/* 시간 열 */}
            <Grid  xs={1}>
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
              <Grid  xs={2} key={key}>
                <Typography variant="h6" align="center">
                  {roomName[key]}
                </Typography>
                {days.Reserve[selectedDay].map((status, index) => (
                  <Box
                    key={index}
                    onClick={()=>setReserveOpen(true)}
                    sx={{
                      // width: '15vw',
                      padding: 1,
                      borderBottom: '1px solid #ddd',
                      backgroundColor:
                        status === 0
                          ? 'white'
                          : '#e4ebfd',
                      color:
                        status === 0
                          ? '#3e5ba5'
                          : status === 2
                          ? '#724c50'
                          : '#888c96'
                    }}
                  >
                    <Typography align="center">{roomState[status]}</Typography>
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
