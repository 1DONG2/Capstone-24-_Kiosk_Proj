import * as React from 'react';
import { useState, useEffect } from 'react';
import { dummy } from './test/example.js';
import QuickButton from './components/QuickButton';
import MyPage from './components/MyPage';
import Loginform from './components/Login';
import TablePage from './components/TablePage.js';
import { db } from './test/firebase';

import { doc, getDoc } from 'firebase/firestore';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HelpIcon from '@mui/icons-material/Help';
import './App.css';

const state = { "A": false, "B": false, "C": false };

function App() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(state);
  const [dailOpen, setDailOpen] = useState(false);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const [tablePageOpen, setTablePageOpen] = React.useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const isWideScreen = windowSize.width+windowSize.height > 1500;
  const [test, setTest] = useState("")

  // async - await로 데이터 fetch 대기
  async function getTest() {
    // document에 대한 참조 생성
    const docRef = doc(db, "test", "test");
    // 참조에 대한 Snapshot 쿼리
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTest(docSnap.data());
      console.log(test.test);
    }
  };

  useEffect(() => { 
    getTest()

    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // 스크롤 체크 함수
    function checkScrollPosition() {
      const scrollTop = window.scrollY; // 현재 스크롤 위치
      const windowHeight = window.innerHeight; // 화면 높이
      const documentHeight = document.documentElement.scrollHeight; // 문서 전체 높이

      if (!dailOpen && scrollTop + windowHeight >= documentHeight - 300) {
        // 아래로 스크롤 끝에 도달
        window.scrollTo({
          top: 250,
          behavior: 'smooth',
        });
      } else if (!dailOpen && scrollTop <= 200) {
        // 위로 스크롤
        window.scrollTo({
          top: 250,
          behavior: 'smooth',
        });
      }
    }
    // 이벤트 리스너 등록
    window.addEventListener('scroll', checkScrollPosition);
  
    // 정리 함수: 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', handleResize);
    };
  }, [dailOpen]);

  const sum_open = Object.values(open).reduce((acc, value) => acc + value, 0);

  const btnclick = function (open, txt) {
    const newOpen = { ...open };
    if (!sum_open) {
      newOpen[txt] = true;
    } else {
      Object.keys(newOpen).forEach(key => {
        newOpen[key] = key === txt && !newOpen[key] ? true : false;
      });
    }
    setOpen(newOpen);
  };

  const currentButton = isWideScreen ? open['B'] : sum_open;

  async function loginfunc(id) {
    const fetchData = async () => {
        const time = new Date().toISOString();

        // IP 가져오기
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();

        // // 위치 가져오기
        // const getLocation = () =>
        //     new Promise((resolve, reject) => {
        //         if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(
        //                 (position) => {
        //                     resolve({
        //                         latitude: position.coords.latitude,
        //                         longitude: position.coords.longitude,
        //                     });
        //                 },
        //                 (error) => {
        //                     reject(error);
        //                 }
        //             );
        //         } else {
        //             reject("Geolocation not supported");
        //         }
        //     });

        try {
            // const location = await getLocation();
            const location = 'test';
            return { time, ip: ipData.ip, location };
        } catch (error) {
            console.error("Error getting location:", error);
            return { time, ip: ipData.ip, location: { latitude: null, longitude: null } };
        }
    };

    try {
        // 사용자 데이터 생성
        const userData = await fetchData().then((data) => ({ id, ...data }));

        // 상태 업데이트 및 세션 스토리지 저장
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));

        console.log("Login successful:", userData);
    } catch (error) {
        console.error("Login failed:", error);
    }
  };

  const logoutfunc = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  return (
    <div className="App">
      <div className='bar'>
        <div className='bar_'>
          <p className='title'>디지털정보관</p>
          <p className='title'> 스터디룸 대여</p>
        </div>
        <hr />
        <div className='login'>
          <Button
            sx={{
              fontSize: isWideScreen ? 28 : 14,
              color: 'white',
              borderColor: 'white',
            }}
            variant="outlined" 
            onClick={user ? ()=>setMyPageOpen(true) : () => setDailOpen(true)}>
            {user ? dummy.account[user.id].name+'님' : 'Log in' }
            {/* 이름부분 */}
          </Button>
          <Loginform loginfunc={loginfunc} setDailOpen={setDailOpen} dailOpen={dailOpen}/>
          <MyPage user={user} logoutfunc={logoutfunc} setMyPageOpen={setMyPageOpen} myPageOpen={myPageOpen}/>
        </div>
      </div>
      <div className='btns'>
        <QuickButton open={open} func={btnclick} text="A" />
        <div className="line" />
        <QuickButton open={open} func={btnclick} text="B" />
        <div className="line" />
        <QuickButton open={open} func={btnclick} text="C" />
      </div>

      <div className='fixbox'
        style={(currentButton) ? { transform: 'translateY(65px)' } : null}>
        <div
          className='tablebtn'>
          <Button sx={{
            fontSize: isWideScreen ? 28 : 16,
            borderRadius: '35px',
            bgcolor: '#ffffff',
            fontWeight: '600',
            color: '#42464f',
          }}
            variant="contained" endIcon={<ArrowForwardIosIcon />}
            onClick={()=>setTablePageOpen(true)}>
            예약시간표
          </Button>
        </div>
        <TablePage user={user} setTablePageOpen={setTablePageOpen} tablePageOpen={tablePageOpen}/>

        <div
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
    </div>
  );
}

export default App;
