import React from 'react';
import { useState, useEffect } from 'react';
// import { dummy } from '../test/example.js';
import './QuickButton.css';

import { db } from '../test/firebase';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const displaytext = {"A": "α", "B": "β", "C": "γ"}
const docRef_open = doc(db, "test", "open");
const docRef_room = doc(db, "test", "room");

function QuickButton({ user, open, func, text, setReserveOpen }) {
  const [dial, setDial] = useState(false);
  const [dial2, setDial2] = useState(false);
  const [lock, setLock] = useState(false);
  const [time, setTime] = useState(false);
  const [timeTable, setTimetable] = useState([]);
  const winsize = window.innerWidth + window.innerHeight;

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');  // 시간 (두 자리로 맞추기)
    const minutes = now.getMinutes().toString().padStart(2, '0');  // 분 (두 자리로 맞추기)
    setTime(`${hours}:${minutes}`);
  }

  useEffect(() => { 
    const unsubscribe_room = onSnapshot(docRef_room, (doc) => {
      setTimetable(doc.data()[text]['Reserve']['day1']);
    });
    const unsubscribe_lock = onSnapshot(docRef_open, (doc) => {
      setLock(doc.data()[text]);
      console.log(doc.data());
    });
    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      unsubscribe_room();
      unsubscribe_lock();
    };
  },[]);

  const updateDocument = async (field, value) => {
    try {
      await updateDoc(docRef_open, {
        [field]: value,  // 동적으로 필드와 값을 설정
      });
      console.log("문서가 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("문서 수정 오류: ", error);
    }
  };

  const unlock = () => {  // 문 열기(사용중 전환) + 키 보관함 오픈 요청
    updateDocument(text, !lock);
    updateDocument("request", text)
    setDial(false);
    setDial2(true)
  };
  const request = () => { // 키 보관함 닫기 요청
    updateDocument("request", "");
    setDial2(false);
  };

  const isWideScreen = winsize > 1500;
  const isOpen = open[text];
  const dt = displaytext[text]

  const IndexToTime = function(index) {
    const hours = String(Math.floor(index / 2) + 6).padStart(2, '0'); // 06부터 시작
    const minutes = index % 2 === 0 ? '00' : '30'; // 0은 ':00', 1은 ':30'
    const time = `${hours}:${minutes}`;
    return time
  }

  const TimeToIndex = function(time) {
    const [hours, minutes] = time.split(':').map(Number);  // 시간을 ':' 기준으로 분리하고 숫자로 변환
    const index = (hours - 6) * 2 + (minutes === 30 ? 1 : 0);  // 06:00부터 시작하는 인덱스 계산
    return index;
  };

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
          {dt}
        </div>
        {isOpen ? (
          <ExpandLess sx={{ width: '100%' }} onClick={isOpen ? () => func(open, text) : null} />
        ) : (
          <ExpandMore onClick={isOpen ? () => func(open, text) : null} />
        )}
        <div className="heightttt" style={{ height: isOpen ? 0 : '26%' }} />
        <Collapse
          className="collapse"
          sx={{ overflow: 'auto' }}
          in={isOpen}
          timeout={{ enter: 600, exit: 200 }}
          unmountOnExit
        >
          <div className="test">
            <ul>
              <ListItem sx={{width: '300px'}}>
                <Grid container spacing={2} justifyContent="center">
                  {timeTable.map((value, index) => (
                    <Grid key={index}>
                      <Button
                        onClick={user ? () => setReserveOpen(true) : () => setDial(true)}
                        sx={{ bgcolor: 'white' }}
                        disabled={Boolean(value)}
                        variant="outlined"
                        size="large"
                      >
                        {IndexToTime(index)}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </ListItem>
            </ul>
          </div>
          <div style={{ height: '80px' }} />
        </Collapse>
      </ListItemButton>
      <div className="icon">
        <IconButton 
        aria-label="Example" onClick={() => setDial(true)}>
          {lock ? (
            <LockOpenOutlinedIcon
              fontSize={isWideScreen ? 'large' : 'medium'}
              sx={{ color: '#9dd52d' }}
            />
          ) : (
            <LockOutlinedIcon
              fontSize={isWideScreen ? 'large' : 'medium'}
              sx={{ color: '#e91e63' }}
            />
          )}
        </IconButton>
      </div>
      <Dialog open={dial} onClose={() => setDial(false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"테스트용"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {user ? `스터디룸 ${text}를 잠금해제하시겠습니까?` : "로그인이 필요합니다. 123 123 ㄱㄱ"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {user && <Button onClick={() => setDial(false)}>아니오</Button>}
          <Button onClick={user ? unlock : () => setDial(false)} autoFocus>
            넹
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dial2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"테스트용"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            키 가져갔으면 확인
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={request} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}

export default QuickButton;
