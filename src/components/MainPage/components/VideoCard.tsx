/* eslint-disable */ 
import React, { useState } from 'react'
import styled from 'styled-components'
import Atropos from 'atropos/react'
import { Button, IconButton } from '@mui/material'
import { EditOutlined, Close } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { videoDataAtom, IsVideoUpdateAtom } from '../../../core/Atom'
import { useNavigate } from 'react-router-dom'
import VideoCardModal from './VideoCardModal'
import { useDeleteVideo } from '../../../core/query'


interface Props {
  video: Video
  isAdmin: boolean
  userId: string
}

const VideoCard = ({ video, isAdmin, userId}: Props) => {
  const navigate = useNavigate()

  // 수정
  const [videoData, setVideoData] = useRecoilState(videoDataAtom)
  const [videoUpdate, setVideoUpdate] = useRecoilState(IsVideoUpdateAtom)

  const onUpdate = (video: Video) => {
    setVideoData({
      ...videoData,
      id: video.id,
      subject: video.subject,
      thumbnailSrc: video.thumbnailSrc,
      videoSeq: video.videoSeq,
      videoTitle: video.videoTitle,
      videoYoutube: video.videoYoutube
    })
    setVideoUpdate(true)
    navigate(`/main/${userId}/video/form`)
  }
  //

  // 삭제
  const {
    deleteVideo,
    isLoading: isDeleting,
  } = useDeleteVideo(video.subject, video.id)

  const onDelete = () => {
    if(isDeleting) return
    deleteVideo()
  }
  //

  const [openModal, setOpenModal] = useState(false)

  const modalClose = () => {
    setOpenModal(false)
  }

  const goToYoutube = () => {
    window.open(video.videoYoutube)
  }

  return (
    <CardWrapper>
      <div className="video-seq">
        <span>{video.videoSeq}</span>
        {isAdmin &&
          <CardAdminNav>
            <IconButton
              size="small" 
              color="secondary"
              onClick={() => onUpdate(video)}
            >
              <EditOutlined fontSize="small"/>
            </IconButton>
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{marginLeft : 1}}
            >
              <Close fontSize="small"/>
            </IconButton>
          </CardAdminNav>
        }
      </div>
      <div className="video-thumbnail">
        <Atropos shadow={false}>
          <img 
            src={video.thumbnailSrc}
            data-atropos-offset="5"
            width={320}
            height={180}
            onClick={() => setOpenModal(true)}
          />
        </Atropos>
      </div>
      <div className="video-title">
        <span>{video.videoTitle}</span>
      </div>
      <Button
        variant="contained"
        size="small"
        onClick={() => goToYoutube()}
      >
        유튜브 보기
      </Button>
      {openModal &&
        <VideoCardModal
          modalClose={modalClose}
          video={video}
        />
      }
    </CardWrapper>
  )
}

export default VideoCard

const CardWrapper = styled.div`
  width: 320px;

  .video-seq {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .video-seq > span:first-child {
    align-self: center;
    border: 1px solid #2E7DDE;
    background-color: #2E7DDE;
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
  }

  .video-thumbnail {
    height: 180px;

    img {
      width: 320px;
      height: 180px;
      cursor: pointer;
    }
  }

  .video-title {
    margin: 10px 0;
    span {
      font-size: 18px;
      font-weight: bold;
      word-break: break-all;
    }
  }

  @media screen and (max-width: 460px) {
    width: 238px;

    .video-thumbnail {
      height: 140px;
  
      img {
        width: 238px;
        height: 140px;
      }
    }
  }
`


const CardAdminNav = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 80%;

  @media screen and (max-width: 520px) {
    width: 60%;
  }
`