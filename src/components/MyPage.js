import * as React from 'react';
import { useState } from 'react';
import { dummy } from '../test/example.js';
import './Login.css';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FilledInput, TextField, Button, Grid2, Typography, Box, Link } from '@mui/material';


function MyPage({user, logoutfunc, setMyPageOpen, myPageOpen}) {
  
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const winsize = window.innerWidth + window.innerHeight;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userId || !password) {
      setError('모든 필드를 채워주세요.');
      return;
    }

    if (userId in dummy.account && password === dummy.account[userId].pwd) {  // 비밀번호 인증
      setError('');
      alert('로그인 성공!');
      logoutfunc(userId)
      setMyPageOpen(false);
    } else {
      setError('이메일 또는 PIN 번호가 잘못되었습니다.');
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      {console.log(myPageOpen)}
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={myPageOpen}
        onClose={()=>setMyPageOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#ffffff', // 배경색
            color: '#092979', // 텍스트 색상
            borderRadius: 3, // 둥근 모서리
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', 
            height: '80vh',
          },
        }}
      >
        <Button
          variant='contained'
          size={winsize ? 'large' : 'medium'}
          onClick={()=>{setMyPageOpen(false); logoutfunc()}}
          sx={{ mt: 3, mb: 3,
            position: 'absolute',
            color: "#acbeea",
            bgcolor: '#092979',
            top: '20px',
            right: '25px',
            border: '1px solid black',
            borderColor: '#acbeea',
            padding: '2px',
            paddingLeft: '10px',
            paddingRight: '10px',
            boxShadow: '0',
            margin: '0'
            }}
        >
          Log Out
        </Button>
        <DialogTitle>My Page</DialogTitle>
        <DialogContent sx={{
          display: 'flex', 
          flexDirection: 'column', 
          marginTop:'40px',
        }}>
          <DialogContentText sx={{ color: '#3c59a3' }}>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '250px' }}>
              <TextField
                variant='filled'
                margin="normal"
                fullWidth
                id="Id"
                inputProps={{ inputMode: 'numeric' }}
                label="피드백 보내기"
                name="Id"
                autoComplete="Id"
                autoFocus
                value={userId}
                onChange={(e) => setUserID(e.target.value)}
                error={!!error}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3,
                  bgcolor: '#ffffff',
                  color: '#092979',
                  height: '45px'
                 }}
              >
                보내기
              </Button>

              {error && (
                <Typography color="error" variant="body2" align="center">
                  {error}
                </Typography>
              )}
            </Box>
              <Grid2 container spacing={3}>
                <Grid2>
                  <Link href="#" variant="body2">
                    PIN 번호 찾기</Link>
                </Grid2>
                <Grid2>
                  <Link href="#" variant="body2">가입하기
                  </Link>
                </Grid2>
              </Grid2>
        </DialogContent>
        <DialogActions>
          <Button sx={{
            position:'absolute',
            color: "#acbeea",
            bgcolor: '#092979',
            bottom: '25px',
            right: '25px',
            border: '1px solid black',
            borderColor: '#acbeea',
            padding: '0'
          }}
          size={winsize ? 'large' : 'medium'}
          onClick={()=>setMyPageOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MyPage;
