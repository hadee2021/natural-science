 /* eslint-disable */ 
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../../core/query'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { IsVideoUpdateAtom } from '../../core/Atom'
import SubjectButton from '../button/SubjectButton'
import { useVideoList } from '../../core/query'
import VideoCard from './components/VideoCard'



const MainVideo = () => {
  const navigate = useNavigate()
  const { id: userId = '' } = useParams()
  const { user } = useUser(userId)

  const subjectArr = ['물리','화학']
  const [tabSubject, setTabSubject] = useState<string>('물리')

  const { videoList } = useVideoList(tabSubject)

  // 수정 여부
  const [videoUpdate, setVideoUpdate] = useRecoilState(IsVideoUpdateAtom)

  // 새로추가
  const goToVideoForm = () => {
    setVideoUpdate(false) // 수정이 아니다.
    navigate(`/main/${userId}/video/form`)
  }

  

  return (
    <VideoWrapper>
      <VideoHeader>
        {subjectArr.map((subject,i) => (
          <SubjectButton
            key={i}
            subject={subject}
            setTabSubject={setTabSubject}
          />
        ))}
      </VideoHeader>
      <VideoBody>
        {videoList.map((video: Video) => (
          <VideoCard
            key={video.id}
            video={video}
            userId={userId}
            isAdmin={user?.author}
          />
        ))}
      </VideoBody>
      {user?.author &&
        <Fab
          color="primary"
          sx={{
            position :"fixed",
            right: 20,
            bottom: 20
          }}
          onClick={() => goToVideoForm()}
        >
          <Add fontSize="large" />
        </Fab>
      }
    </VideoWrapper>
  )
}

export default MainVideo

const VideoWrapper = styled.div`

`

const VideoHeader = styled.div`
  display: flex;
  margin-top: 15px;
  margin-bottom: 40px;

  > div:first-child {
    display: flex;
    align-items: center;
    margin-right: 15px;
    font-weight: bold;
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 40px;

    > div:first-child,
    > div > button {
      font-size: 18px;
    }
  }
`

const VideoBody = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 40px;

  @media screen and (max-width: 1368px) {
    justify-content: center;
  }
`