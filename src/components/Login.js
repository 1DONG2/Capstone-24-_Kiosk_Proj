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


function Loginform({loginfunc, setDailOpen, dailOpen}) {
  
  const [userId, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userId || !password) {
      setError('모든 필드를 채워주세요.');
      return;
    }

    if (userId in dummy.account && password === dummy.account[userId].pwd) {  // 비밀번호 인증
      setError('');
      alert('로그인 성공!');
      loginfunc(userId)
      setDailOpen(false);
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
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={dailOpen}
        onClose={()=>setDailOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#092979', // 배경색
            color: '#ffffff', // 텍스트 색상
            borderRadius: 3, // 둥근 모서리
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', 
            alignItems: 'center',
            height: '80vh',
          },
        }}
      >
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          marginTop:'40px',
          '.MuiInputBase-root::before': {
            display:'none'
          },
          '.MuiInputBase-root::after': {
            display:'none'
          },
          '.MuiInputBase-root': {
            borderRadius: '15px',
          },
          '& .MuiInputBase-input': {
            color: 'white', // 내부 글자 색을 흰색으로 설정
          },
          '.MuiFilledInput-root': {
            bgcolor: '#3c59a3', // 배경색
          },
          '& .MuiInputLabel-root': {
            // 기본상태 라벨 색상
            color: '#7792d4',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            // 포커스 상태에서 라벨 색상
            color: '#acbeea',
          },
          '& .MuiInputLabel-root.Mui-error': {
            // 오류 상태에서 라벨 색상
            color: '#dc3545',
          },
          '&.Mui-focused': {
            '& .MuiFilledInput-input': {
              color: '#ffffff', // 포커스 시 텍스트 색상 변경
            },
          },
        }}>
          <DialogContentText sx={{ color: '#3c59a3' }}>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '250px' }}>
              <TextField
                variant='filled'
                margin="normal"
                required
                fullWidth
                id="Id"
                type='number'
                inputProps={{ inputMode: 'numeric' }}
                label="학번"
                name="Id"
                autoComplete="Id"
                autoFocus
                value={userId}
                onChange={(e) => setUserID(e.target.value)}
                error={!!error}
              />
              <FormControl
                fullWidth
                required
                variant="filled"
                margin="normal"
                error={!!error && error.includes('PIN 번호')}
              >
                <InputLabel htmlFor="password">PIN 번호</InputLabel>
                <FilledInput
                  id="password"
                  label="PIN 번호"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputProps={{ inputMode: 'numeric' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                      sx={{color: '#ffffff'}}
                        aria-label={showPassword ? 'PIN 번호 숨기기' : 'PIN 번호 보기'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

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
                로그인
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
            color: "#acbeea",
            position:'absolute',
            bottom: '25px',
            right: '25px',
            border: '1px solid black',
            borderColor: '#acbeea',
            padding: '0'
          }}
          onClick={()=>setDailOpen(false)}
          >Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Loginform;
