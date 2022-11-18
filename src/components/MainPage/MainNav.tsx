 /* eslint-disable */ 
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { IsQuestionUpdateAtom, IsQuickAddAtom } from '../../core/Atom'
import { DateTime } from "luxon"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faStar, faBook, faAngleRight, faPen ,faBookReader ,faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

interface Props {
  userName: string
}

const MainNav = ({userName} : Props) => {
  const location = useLocation()
  const { id: userId = '' } = useParams()
  
  const [pathname, setPathname] = useState('')
  useEffect(() => {
    setPathname(location.pathname)
  }, [location])

  const navigate = useNavigate()

  const [questionUpdate, setQuestionUpdate] = useRecoilState(IsQuestionUpdateAtom)
  const [questionQuickAdd, setQuestionQuickAdd] = useRecoilState(IsQuickAddAtom)

  const movePage = (move: string) => {
    setQuestionUpdate(false)
    setQuestionQuickAdd(false)
    navigate(move)
  }

  const [time, setTime] = useState(DateTime.now())

  setInterval(() => {
    setTime(DateTime.now())
  }, 1000)

  return (
    <MainNavWrapper>
      <div className="time">
        {time.toLocaleString(DateTime.TIME_SIMPLE)} 
      </div>
      <div className="user-name">
        <span>{userName}</span>
      </div>
      <div
        className={pathname === `/main/${userId}`? "highlight": "nav-btn"}
        onClick={() => movePage(`/main/${userId}`)}
      >
        <div>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#F05A4E"}}/>
          <span>홈</span>
        </div>
        {pathname === `/main/${userId}` &&
          <FontAwesomeIcon icon={faAngleRight}/>
        }
      </div>
      <div
        className={pathname === `/main/${userId}/review`? "highlight": "nav-btn"}
        onClick={() => movePage(`/main/${userId}/review`)}
      >
        <div>
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFCA2B" }}/>
          <span>복습문제</span>
        </div>
        {pathname === `/main/${userId}/review` &&
          <FontAwesomeIcon icon={faAngleRight}/>
        }
      </div>
      <div
        className={pathname === `/main/${userId}/principle`? "highlight": "nav-btn"}
        onClick={() => movePage(`/main/${userId}/principle`)}
      >
        <div>
          <FontAwesomeIcon icon={faPen} style={{ color: "#474D59" }}/>
          <span>원칙 공부</span>
        </div>
        {pathname === `/main/${userId}/principle` &&
          <FontAwesomeIcon icon={faAngleRight}/>
        }
      </div>
      <div
        className={pathname === `/main/${userId}/workbook`? "highlight": "nav-btn"}
        onClick={() => movePage(`/main/${userId}/workbook`)}
      >
        <div>
          <FontAwesomeIcon icon={faBook} style={{ color: "#2F74C0" }}/>
          <span>문제집</span>
        </div>
        {pathname === `/main/${userId}/workbook` &&
          <FontAwesomeIcon icon={faAngleRight}/>
        }
      </div>
      <div
        className={pathname === `/main/${userId}/notice`? "highlight": "nav-btn"}
        onClick={() => movePage(`/main/${userId}/notice`)}
      >
        <div>
          <FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#42B883" }}/>
          <span>공지 사항</span>
        </div>
        {pathname === `/main/${userId}/notice` &&
          <FontAwesomeIcon icon={faAngleRight}/>
        }
      </div>
    </MainNavWrapper>
  )
}

export default MainNav

const MainNavWrapper = styled.div`
  width: 220px;
  min-width: 220px;
  margin: 35px 0;
  margin-left: 25px;
  margin-right: 15px;
  border-radius: 9px;
  /*background-color: white;*/
  padding-left: 20px;
  padding-bottom: 25px;
  font-size: 1.1rem;

  .highlight {
    /*color: #2F74C0;*/
    background: #FFFFFF;
    border-radius: 9px;
    display: flex;
    justify-content: space-between;

    > div:first-child > span {
      margin-left: 15px;
    }
  }

  .nav-btn {
    > div:first-child > span {
      margin-left: 15px;
    }
  }

  > div {
    margin: 12px 0;
    padding: 12px 10px;
    cursor: pointer;
  }

  .time {
    border-bottom: 1px solid aliceblue;
    font-weight: bold;
    font-size: 25px;
    color: #2F74C0;
    cursor: auto;
    margin-left: 24px;
  }

  .user-name {
    word-break: break-word;
    cursor: auto;
    font-weight: bold;
  }

  @media screen and (max-width: 768px) {
    width: 150px;
    min-width: 150px;
    font-size: 15px;
    .time {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 560px) {
    width: 100px;
    min-width: 100px;
    font-size: 13px;
    .time {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 450px) {
    width: 80px;
    min-width: 80px;
    font-size: 13px;
  }
`