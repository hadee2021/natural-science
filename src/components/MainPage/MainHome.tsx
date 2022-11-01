import React from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { useUser } from '../../core/query'
import { Button } from '@mui/material'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { questionDataAtom, IsQuestionUpdateAtom } from '../../core/Atom'

const MainHome = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)
  const navigate = useNavigate()

  const[questionData, setQuestionData] = useRecoilState(questionDataAtom)
  const[questionUpdate, setQuestionUpdate] = useRecoilState(IsQuestionUpdateAtom)

  const goToForm = () => {
    setQuestionData({
      ...questionData,
      step : '',
      questionSequence: 1,
    })
    setQuestionUpdate(false) // 수정이 아니다.
    navigate(`/main/${userId}/form`)
  }

  return (
    <MainHomeWrapper>
      <div className="user-name">
        {user?.name} 님
      </div>
      <Descript>
        <span>
          원칙 공부를 통해 기출문제를 분석하세요<br/>
          테마별로 연습 할 수 있습니다 !<br/>
          다시 풀어보고 싶은문제를 체크하면<br/>
          복습문제에서 보실 수 있습니다.<br/>
        </span>
      </Descript>
      <div className="logout">
        <Button onClick={ () => { navigate('/')} }>로그아웃</Button>
      </div>
      <Fab
        color="primary"
        sx={{
          position :"fixed",
          right: 20,
          bottom: 20
        }}
        onClick={() => goToForm()}
      >
        <Add fontSize="large" />
      </Fab>
    </MainHomeWrapper>
  )
}

export default MainHome

const MainHomeWrapper = styled.div`
  .user-name {
    font-size: 25px;
    text-align: center;
    margin-top: 30px;
  }
  .logout {
    display: flex;
    justify-content: flex-end;
    width: 340px;
    margin: 0 auto;
    margin-top: 20px;
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
  margin-top: 65px;
`