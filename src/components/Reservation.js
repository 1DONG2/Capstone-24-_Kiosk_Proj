import * as React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ReservationPage({ user, setReserveOpen, reserveOpen }) {
  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // 중앙 정렬
    maxWidth: '400px',
    marginBottom: '30px',
    [`& .MuiToggleButton-root`]: {
      width: '105px',
      padding: theme.spacing(1.3, 1),
      backgroundColor: 'white',
      color: 'black',
      "&.Mui-selected, &.Mui-selected:hover": {
        backgroundColor: '#3c59a3', // 눌렀을 때 배경색 변경
        color: 'white',
      },
    },
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: '1px solid #dddddd',
      borderRadius: theme.shape.borderRadius,
    },
  }));

  const [selectedTime, setSelectedTime] = React.useState(null);

  const handleTimeChange = (event, newTime) => {
    setSelectedTime(newTime);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth={'sm'}
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#fffff', // 배경색
            color: '#092979', // 텍스트 색상
            borderRadius: 3, // 둥근 모서리
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
          },
        }}
      >
        <DialogTitle>예약</DialogTitle>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px',
          '.MuiInputBase-root::before': {
            display: 'none'
          },
          '.MuiInputBase-root::after': {
            display: 'none'
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
            ~월 ~일 ~ 스터디룸 시간~시간
          </DialogContentText>
          
          <Paper sx={{
            bgcolor: 'transparent',
            boxShadow: '0',
            padding: 2,
          }}
            elevation={3}>
            <StyledToggleButtonGroup
              value={selectedTime}
              exclusive
              onChange={handleTimeChange}
              aria-label="time duration"
            >
              <ToggleButton value="30min" aria-label="30 minutes">
                30분
              </ToggleButton>
              <ToggleButton value="1hour" aria-label="1 hour">
                1시간
              </ToggleButton>
              <ToggleButton value="1.5hour" aria-label="1.5 hours">
                1시간 30분
              </ToggleButton>
              <ToggleButton value="2hour" aria-label="2 hours">
                2시간
              </ToggleButton>
              <ToggleButton value="2.5hour" aria-label="2.5 hours">
                2시간 30분
              </ToggleButton>
              <ToggleButton value="3hour" aria-label="3 hours">
                3시간
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </DialogContent>

        <DialogActions>
          <Button sx={{
            color: "#acbeea",
            position: 'absolute',
            bottom: '25px',
            right: '25px',
            border: '1px solid black',
            borderColor: '#acbeea',
            padding: '0'
          }}
            onClick={() => setReserveOpen(false)}
          >Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ReservationPage;
