import * as React from 'react';
import { useState, useEffect } from 'react';
import QuickButton from './components/QuickButton';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpIcon from '@mui/icons-material/Help';
import './App.css';

const state = { "A": false, "B": false, "C": false };

function App() {
  const [open, setOpen] = useState(state);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const isWideScreen = windowSize.width+windowSize.height > 1500;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const btnclick = function (open, txt) {
    const newOpen = { ...open };
    if (!Object.values(newOpen).reduce((acc, value) => acc + value, 0)) {
      newOpen[txt] = true;
    } else {
      Object.keys(newOpen).forEach(key => {
        newOpen[key] = key === txt && !newOpen[key] ? true : false;
      });
    }
    setOpen(newOpen);
  };

  const currentButton = isWideScreen ? 'B' : 'C';

  return (
    <div className="App">
      <div className='bar'>
        <div className='bar_'>
          <p className='title'>디지털정보관</p>
          <p className='title'>스터디룸 대여</p>
        </div>
        <hr />
      </div>
      <div className='btns'>
        <QuickButton open={open} func={btnclick} text="A" />
        <div className="line" />
        <QuickButton open={open} func={btnclick} text="B" />
        <div className="line" />
        <QuickButton open={open} func={btnclick} text="C" />
      </div>

      <div
        style={open[currentButton] ? { transform: 'translateY(40px)' } : null}
        className='tablebtn'>
        <Button sx={{
          fontSize: isWideScreen ? 28 : 16,
          padding: isWideScreen ? '14px' : '10px',
          paddingLeft: isWideScreen ? '28px' : '20px',
          paddingRight: isWideScreen ? '28px' : '20px',
          borderRadius: '35px',
          bgcolor: '#ffffff',
          fontWeight: '600',
          color: '#42464f',
          left: isWideScreen ? 114 : 68,
          bottom: isWideScreen ? 30 : 0
        }}
          variant="contained" endIcon={<ArrowForwardIosIcon />}>
          예약시간표
        </Button>
      </div>

      <div
        style={open[currentButton] ? { transform: 'translateY(40px)' } : null}
        className='help'>
        <IconButton aria-label="Example">
          <HelpIcon sx={{
            borderRadius: '35px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: isWideScreen ? 70 : 50
          }} />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
