 /* eslint-disable */ 
import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useUser } from '../../core/query'
import PersonChart from '../PersonChart'

const MainHome = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  return (
    <MainHomeWrapper>
      <div className="user-name">
        {user?.name} 님
      </div>
      {/* <Descript>
        <span>
          원칙 공부를 통해 기출문제를 분석하세요<br/>
          테마별로 연습 할 수 있습니다 !<br/>
          다시 풀어보고 싶은문제를 체크하면<br/>
          복습문제에서 보실 수 있습니다.<br/>
        </span>
      </Descript>
      <div className="logout">
        <Button onClick={ () => navigate('/') }>로그아웃</Button>
      </div> */}
      <PersonChart/>
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