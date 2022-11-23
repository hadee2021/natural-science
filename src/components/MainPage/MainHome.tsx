 /* eslint-disable */ 
import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useUser } from '../../core/query'
import PersonChart from '../PersonChart'

const MainHome = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  const subjectArr = ["물리", "화학"]


  return (
    <MainHomeWrapper>
      <div className="user-name">
        {user?.name} 님의 복습현황
      </div>
      {subjectArr.map((subject,i) => (
        <PersonChart
          key={i}
          userId={userId}
          subject={subject}
        />
      ))}
    </MainHomeWrapper>
  )
}

export default MainHome

const MainHomeWrapper = styled.div`
  .user-name {
    font-size: 25px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 65px;
  }
  .logout {
    display: flex;
    justify-content: flex-end;
    width: 340px;
    margin: 0 auto;
    margin-top: 20px;
  }
  @media screen and (max-width: 768px) {
    .logout {
      width: 250px;
    }
  }

  @media screen and (max-width: 495px) {
    .logout {
      width: 200px;
    }
  }

  @media screen and (max-width: 410px) {
    .logout {
      width: 130px;
    }
  }
`

const Descript = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-height: 107px;
  background: #f7f8f9;
  border-radius: 8px;
  padding: 15px;
  line-height: 1.7;
  font-size: 16px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 200px;
    min-height: 87px;
    font-size: 11px;
    line-height: 2;
  }

  @media screen and (max-width: 495px) {
    width: 165px;
    min-height: 87px;
    font-size: 10px;
    line-height: 2;
  }

  @media screen and (max-width: 410px) {
    width: 100px;
    font-size: 10px;
  }
`