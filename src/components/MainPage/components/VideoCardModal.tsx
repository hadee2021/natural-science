 /* eslint-disable */ 
import React from 'react'
import styled from 'styled-components'
import { IconButton } from '@mui/material'
import { Close } from '@mui/icons-material'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'

interface Props {
  modalClose: () => void
  video: Video
}

const VideoCardModal = ({ modalClose, video }: Props) => {
  return (
    <ModalWrapper>
      <ModalBody>
        <div className="close-btn">
          <IconButton
            size="small"
            sx={{color: "orangered"}}
            onClick={modalClose}
          >
            <Close fontSize="large"/>
          </IconButton>
        </div>
        <YouTube
          title={video.videoTitle}
          videoId={getVideoId(video.videoYoutube).id ?? ''}
          opts={{
            width: '100%',
            height: '400px',
          }}
        />
      </ModalBody>
    </ModalWrapper>
  )
}

export default VideoCardModal

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBody = styled.div`
  display: flex;
  flex-flow: column;
  width: 711px;
  height: 495px;
  background-color: lightskyblue;

  .close-btn {
    align-self: flex-end;
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

  @media screen and (max-width: 760px) {
    width: 88%;
    height: 390px;
    .close-btn > button {
      width: 30px;
      height: 30px;
      margin-right: 3px;
    }
  }
`