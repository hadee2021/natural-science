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
  /*background-color: aliceblue;*/
  background-color: #F8F6F9;
  height: 100vh;
  
  > div:last-child {
    flex: 1;
    background-color: white;
    /*margin: 35px 0;
    margin-right: 25px;
    border-radius: 9px;
    padding: 30px;*/
    padding: 40px 30px;
    overflow: auto;
  }

  > div:last-child::-webkit-scrollbar {
    width: 10px;
  }

  > div:last-child::-webkit-scrollbar-thumb {
    background-color: #14a3e6;
    border-radius: 10px;
  }

  > div:last-child::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  @media screen and (max-width: 768px) {
    > div:last-child {
      padding: 15px;
    }
  }
`