 /* eslint-disable */ 
import React, { useState, useEffect } from 'react'
import { useEditVideo } from '../../core/query'
import { useForm, Controller } from 'react-hook-form'
import { Box, Button, TextField, MenuItem, Tooltip } from '@mui/material'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { videoDataAtom, IsVideoUpdateAtom } from '../../core/Atom'
import { useDeepCompareEffect } from 'use-deep-compare'
import YouTube from 'react-youtube'
import getVideoId from 'get-video-id'

const VideoForm = () => {

  /** 문제 제출  */

  const [inputSubject, setInputSubject] = useState<string>('물리')
  const subjectArr = ['물리', '화학']

  const [thumbnailSrc, setThumbnailSrc] = useState<string>('')

  const navigate = useNavigate()
  const { 
    id: userId = ''
  } = useParams()

  //수정
  const [videoData, setVideoData] = useRecoilState(videoDataAtom)
  const [videoUpdate, setVideoUpdate] = useRecoilState(IsVideoUpdateAtom)
  //

  const videoForm = useForm<Video>({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  //수정 -> 처음에 보여주는 값들
  useDeepCompareEffect(() => {
    if(!videoUpdate) return 
    setInputSubject(videoData.subject)
    setThumbnailSrc(videoData.thumbnailSrc)
    videoForm.reset({
      videoSeq: videoData.videoSeq,
      videoTitle: videoData.videoTitle,
      videoYoutube: videoData.videoYoutube
    })
  },[videoData])
  //

  const { 
    handleSubmit,
    control,
    register,
    watch
  } = videoForm

  const { videoYoutube } = watch()
  
  useEffect(() => {
    if(!videoYoutube) return
    let youtubeId = getVideoId(videoYoutube)?.id ?? ''
    setThumbnailSrc(`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`)
  },[videoYoutube])

  //수정
  let videoUpdateId
  if(videoData.id !== '') {
    videoUpdateId = videoData.id
  }
  else if(videoData.id === '') {
    videoUpdateId = undefined
  }
  //

  const {
    editVideo,
    isLoading: isSaving
  } = useEditVideo(inputSubject, videoUpdateId)

  const OnSave = handleSubmit(form => {
    if(isSaving) return

    const {
      videoSeq,
      videoTitle,
      videoYoutube
    } = form

    const nextVideoForm = {
      subject: inputSubject,
      thumbnailSrc: thumbnailSrc,
      videoSeq: videoSeq,
      videoTitle: videoTitle,
      videoYoutube: videoYoutube
    }

    editVideo(nextVideoForm)

    setVideoData({
      id: '',
      subject: '',
      thumbnailSrc: '',
      videoSeq: 1,
      videoTitle: '',
      videoYoutube: ''
    })
    setVideoUpdate(false) // 수정 끝

    navigate(`/main/${userId}/video`)
  })


  return (
    <VideoFormWrapper>
      <div className="title">
        <h3>
          관리자 전용 영상 제출 양식
        </h3>
      </div>
      <SectionContainer>
        <LeftSection>
          <div className="subject">
            <Controller
              name="subject"
              control={control}
              render={() => (
                <TextField
                  sx={{ width: '150px'}}
                  select
                  label="과목"
                  value={inputSubject}
                  size="small"
                  onChange={(e) => setInputSubject(e.target.value as string)}
                >
                  { 
                    subjectArr.map((subject, i) => (
                      <MenuItem value={subject} key={i}>{subject}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
        </LeftSection>
        <RightSection>
        <div className="video-seq">
            <Controller
              name="videoSeq"
              control={control}
              rules={{
                required: "순서는 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="순서는 1 2 3 .." placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="순서"
                    variant="standard"
                    {...register("videoSeq")}
                    helperText={(
                      <Box
                        component="span"
                        visibility={fieldState.error ? "visible" : "hidden"}
                      >
                        <span>
                          {fieldState.error?.message}
                        </span>
                      </Box>
                    )}
                  />
                </Tooltip>
              )}
            />
          </div>
          <div className="video-title">
            <Controller
              name="videoTitle"
              control={control}
              rules={{
                required: "제목은 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="제목 입력" placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="제목"
                    variant="standard"
                    {...register("videoTitle")}
                    helperText={(
                      <Box
                        component="span"
                        visibility={fieldState.error ? "visible" : "hidden"}
                      >
                        <span>
                          {fieldState.error?.message}
                        </span>
                      </Box>
                    )}
                  />
                </Tooltip>
              )}
            />
          </div>
        </RightSection>
      </SectionContainer>
      <div className="video-link">
        <Controller
          name="videoYoutube"
          control={control}
          render={({ fieldState }) => (
            <Tooltip title="유튜브 링크 입력" placement="bottom">
              <TextField
                error={Boolean(fieldState.error)}
                placeholder="e.g) https://www.youtube.com/watch?v=..."
                variant="standard" 
                fullWidth
                {...register('videoYoutube', {
                  validate (link) {
                    const trimmed = link.trim()
                    if (!trimmed) return undefined
                    const { id, service } = getVideoId(trimmed)
                    if (!id || service !== 'youtube') {
                      return '정상적인 YouTube 동영상 주소를 입력해주세요.'
                    }
                    return undefined
                  }
                })}
              />
            </Tooltip>
          )}
        />
      </div>
      <div className="video-preview">
        <img src={thumbnailSrc}/>
        {videoYoutube 
          ? 
            <YouTube
              title="유튜브"
              videoId={getVideoId(videoYoutube).id ?? ''}
              opts={{
                width: '500px',
                height: '300px',
              }}
            />
          :
          <div>미리보기 준비중....</div>
        }
      </div>
      <Button
        variant="contained"
        disabled={ thumbnailSrc === ''}
        sx={{ width: 200 }}
        onClick={OnSave}
      >
        제출
      </Button>
    </VideoFormWrapper>
  )
}

export default VideoForm

const VideoFormWrapper = styled.div`
  > div {
      
    .title {
      h3 {
        font-size: 25px;
        font-weight: normal;
      }
    }
  }

  .video-link {
    width: 70%;
  }

  .video-preview {
    margin-top: 20px;

    img {
      margin-bottom: 15px;
    }
  }
`

const SectionContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
`

const LeftSection = styled.div`
  flex: 1;

  > div {
    margin-bottom: 20px;
  }
`

const RightSection = styled.div`
  flex: 1;

  > div {
    margin-bottom: 20px;
  }
`