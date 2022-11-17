 /* eslint-disable */ 
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { IsQuestionUpdateAtom, IsQuickAddAtom } from '../../core/Atom'
import { DateTime } from "luxon"

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
        <span>닉네임 : </span>
        {userName}
      </div>
      <div
        className={pathname === `/main/${userId}`? "highlight": ""}
        onClick={() => movePage(`/main/${userId}`)}
      >
        홈
      </div>
      <div
        className={pathname === `/main/${userId}/review`? "highlight": ""}
        onClick={() => movePage(`/main/${userId}/review`)}
      >
        복습문제
      </div>
      <div
        className={pathname === `/main/${userId}/principle`? "highlight": ""}
        onClick={() => movePage(`/main/${userId}/principle`)}
      >
        원칙 공부
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
  /*background-color: #FFF390;*/
  padding: 25px 20px;
  padding-top: 0;
  font-size: 1.1rem;
  text-align: center;

  .highlight {
    color: #2F74C0;
  }

  > div {
    margin: 12px 0;
    border-bottom: 1px solid orangered;
    padding-bottom: 15px;
    cursor: pointer;
  }

  .time {
    border-bottom: 1px solid aliceblue;
    font-weight: bold;
    font-size: 25px;
    color: #2F74C0;
  }

  .user-name {
    word-break: break-word;
    
    > svg:first-child {
      align-self: center;
    }
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