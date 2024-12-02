import React from 'react';
import { useState, useEffect } from 'react';
import { dummy } from '../test/example.js';
import './QuickButton.css';

import { db } from '../test/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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

const displaytext = {"A": "α", "B": "β", "C": "γ"}
const docRef = doc(db, "test", "open");  // test 컬렉션의 open 문서 참조

function QuickButton({ open, func, text }) {
  const [dial, setDial] = useState(false);
  const [dial2, setDial2] = useState(false);
  const [lock, setLock] = useState(false);
  const winsize = window.innerWidth + window.innerHeight;

  async function getLock() {
    // document에 대한 참조 생성
    // 참조에 대한 Snapshot 쿼리
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLock(docSnap.data()[text]);
      console.log(docSnap.data());
    }
  };

  useEffect(() => { 
    getLock();
  },[]);

  const handleClickOpen = () => setDial(true);
  const handleClose = () => setDial(false);
  const handleClickOpen2 = () => setDial2(true);
  const handleClose2 = () => setDial2(false);

  const updateDocument_room = async () => {
    try {
      await updateDoc(docRef, {
        [text]: !lock,  // a 필드를 새 값으로 업데이트
      });
      console.log("문서가 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("문서 수정 오류: ", error);
    }
    getLock();
  };
  const updateDocument_reqeust = async function(req) {
    try {
      await updateDoc(docRef, {request : req});
      console.log("문서가 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("문서 수정 오류: ", error);
    }
    getLock();
  };

  const unlock = () => {
    updateDocument_reqeust(text)
    // dummy.empty[text] = false // test
    setDial(false);
    handleClickOpen2()
  };
  const request = () => {
    updateDocument_room();
    updateDocument_reqeust("");
    // dummy.empty[text] = false // test
    setDial2(false);
    console.log('dddd')
  };

  const isWideScreen = winsize > 1500;
  const isOpen = open[text];
  const dt = displaytext[text]

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
      <Dialog open={dial} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"테스트용"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            스터디룸 {text}를 잠금해제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={unlock} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={dial2} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"테스트용"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            키 가져갔으면 확인
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button onClick={request} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  );
}

export default QuickButton;
