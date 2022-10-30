import React from 'react'
import styled from 'styled-components'
import { Outlet, Navigate, useParams } from 'react-router-dom'
import MainNav from '../components/MainPage/MainNav'
import { useUser } from '../core/query'

const Main = () => {
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)
  

  // user id 없으면 시작페이지로
  if(!userId) {
    return <Navigate to="/" />
  }
  return (
    <MainWrapper>
      <MainNav
        userName={user?.name}
      />
      <Outlet/>
    </MainWrapper>
  )
}

export default Main

const MainWrapper = styled.div`
  display: flex;
  background-color: aliceblue;
  height: 100vh;
  
  > div:last-child {
    flex: 1;
    background-color: white;
    margin: 35px 0;
    margin-right: 25px;
    border-radius: 9px;
    padding: 30px;
  }
`