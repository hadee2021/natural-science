 /* eslint-disable */ 
import React, { useState, useEffect } from 'react'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from '../../core/firestore'
import { useEditQuestionBook } from '../../core/query'
import { useForm, Controller } from 'react-hook-form'
import { subjectObj } from '../../module/subjectData'
import { Box, Button, TextField, MenuItem, Tooltip } from '@mui/material'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { questionBookDataAtom, IsQuestionBookUpdateAtom } from '../../core/Atom'
import { useDeepCompareEffect } from 'use-deep-compare'

const WorkBookForm = () => {
  /** 사진 업로드 */
  const [imageUpload, setImageUpload] = useState<any>()
  const [uploadFolderName, setUploadFolderName] = useState('')
  const [imageURL, setImageURL] = useState('')

  const uploadImg = () => {
    if (imageUpload === null) return
    const imageRef = ref(storage, `${uploadFolderName}/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url)
      })
    })
  }

  /** pdf 업로드 */
  const [pdfUpload, setPdfUpload] = useState<any>()
  const [uploadPdfFolderName, setUploadPdfFolderName] = useState('')
  const [pdfURL, setPdfURL] = useState('')

  const uploadPdf = () => {
    if (pdfUpload === null) return
    const pdfRef = ref(storage, `${uploadPdfFolderName}/${pdfUpload.name}`)
    uploadBytes(pdfRef, pdfUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPdfURL(url)
      })
    })
  }

  /** 문제 제출  */

  const [inputSubject, setInputSubject] = useState<string>('물리')
  const subjectArr = ['물리', '화학']

  const navigate = useNavigate()
  const { 
    id: userId = '',
    subject = '',
  } = useParams()

  //수정
  const [questionBookData, setQuestionBookData] = useRecoilState(questionBookDataAtom)
  const [questionBookUpdate, setQuestionBookUpdate] = useRecoilState(IsQuestionBookUpdateAtom)
  //

  const questionBookForm = useForm<QuestionBook>({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  //수정 -> 처음에 보여주는 값들
  useDeepCompareEffect(() => {
    if(!questionBookUpdate) return
    setInputSubject(questionBookData.subject)
    setImageURL(questionBookData.imgSrc)
    setPdfURL(questionBookData.questionBookpdf)
    questionBookForm.reset({
      questionBookSeq: questionBookData.questionBookSeq,
      questionBookTitle: questionBookData.questionBookTitle,
      questionBookPrice: questionBookData.questionBookPrice,
      questionBookDetail: questionBookData.questionBookDetail,
      questionBookShop: questionBookData.questionBookShop
    })
  },[questionBookData])
  //

  const { 
    handleSubmit,
    control,
    register,
  } = questionBookForm

  //수정
  let questionBookUpdateId
  if(questionBookData.id !== '') {
    questionBookUpdateId = questionBookData.id
  }
  else if(questionBookData.id === '') {
    questionBookUpdateId = undefined
  }
  //

  const {
    editQuestionBook,
    isLoading: isSaving
  } = useEditQuestionBook(inputSubject, questionBookUpdateId)


  const OnSave = handleSubmit(form =>{
    if(isSaving) return

    const {
      questionBookSeq,
      questionBookTitle,
      questionBookPrice,
      questionBookDetail,
      questionBookShop
    } = form

    const nextQuestionBookForm = {
      subject: inputSubject,
      imgSrc: imageURL,
      questionBookSeq: questionBookSeq,
      questionBookTitle: questionBookTitle,
      questionBookPrice: questionBookPrice,
      questionBookDetail: questionBookDetail,
      questionBookShop: questionBookShop,
      questionBookpdf: pdfURL
    }

    editQuestionBook(nextQuestionBookForm)
    
    setQuestionBookData({
      id: '',
      subject: '',
      imgSrc: '',
      questionBookSeq: 1,
      questionBookTitle: '',
      questionBookPrice: 0,
      questionBookDetail: '',
      questionBookShop: '',
      questionBookpdf: ''
    })
    setQuestionBookUpdate(false) // 수정 끝

    navigate(`/main/${userId}/workbook`)
  })

  return (
    <QuestionFormWrapper>
      <div className="title">
        <h3>
          관리자 전용 문제집 제출 양식
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
          <div className="book-seq">
            <Controller
              name="questionBookSeq"
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
                    {...register("questionBookSeq")}
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
          <div className="book-title">
            <Controller
              name="questionBookTitle"
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
                    {...register("questionBookTitle")}
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
          <div className="book-price">
            <Controller
              name="questionBookPrice"
              control={control}
              rules={{
                required: "가격은 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="10000 20000" placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="가격 (숫자)"
                    variant="standard"
                    {...register("questionBookPrice")}
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
          <div className="book-shop">
            <Controller
              name="questionBookShop"
              control={control}
              rules={{
                required: "구매링크는 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="www.naver.com" placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="구매 링크"
                    variant="standard"
                    {...register("questionBookShop")}
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
      <Box 
        sx={{ 
          marginTop: 5,
          paddingBottom: 5,
          borderBottom: "1px solid",
          borderBottomColor: "orangered"
        }}
      >
        <TextField
          label="세부사항"
          variant="outlined" fullWidth
          multiline rows={7}
          InputProps={{
            inputProps: { maxLength: 10240 },
          }}
          {...register('questionBookDetail')}
        />
      </Box>
      <Box
        sx={{ 
          paddingBottom: 5,
          borderBottom: "1px solid",
          borderBottomColor: "orangered"
        }}
      >
        <div className="file-upload">
          <p>문제집 pdf 업로드</p>
          <TextField
            type="file"
            size="small"
            onChange={(event: any) => {
              setPdfUpload(event.target.files[0])
            }}
          />
        </div>
        <div className="file-folder">
          <TextField 
            placeholder="저장 할 위치 폴더경로"
            size="small"
            value={uploadPdfFolderName}
            onChange={(e) => setUploadPdfFolderName(e.target.value)}
          />
          <Button 
            onClick={uploadPdf}
            variant="contained"
            disabled={uploadPdfFolderName === ''}
          >
            pdf 업로드
          </Button>
          <span>
            ex. A폴더 / B폴더 / ...
          </span>
        </div>
      </Box>
      <div className="file-upload">
        <p>문제집 사진 업로드</p>
        <TextField
          type="file"
          size="small"
          onChange={(event: any) => {
            setImageUpload(event.target.files[0])
          }}
        />
      </div>
      <div className="file-folder">
        <TextField 
          placeholder="저장 할 위치 폴더경로"
          size="small"
          value={uploadFolderName}
          onChange={(e) => setUploadFolderName(e.target.value)}
        />
        <Button 
          onClick={uploadImg}
          variant="contained"
          disabled={uploadFolderName === ''}
        >
          이미지 업로드
        </Button>
        <span>
          ex. A폴더 / B폴더 / ...
        </span>
      </div>
      <Button
        variant="contained"
        disabled={
          imageURL === '' || pdfURL === ''
        }
        sx={{ width: 200 }}
        onClick={OnSave}
      >
        제출
      </Button>
      <div>
        {imageURL === ''
          ? <p>미리보기 준비중.....</p>
          : <img src={imageURL} width={300 + 'px'}/>
        }
      </div>
    </QuestionFormWrapper>
  )
}

export default WorkBookForm

const QuestionFormWrapper = styled.div`
  > div {
    
    .title {
      h3 {
        font-size: 25px;
        font-weight: normal;
      }
    }
  }

  .file-upload {
    margin-bottom: 20px;
  }

  .file-folder {
    margin-bottom: 30px;
    > div,
    > button
    {
      margin-right: 15px;
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