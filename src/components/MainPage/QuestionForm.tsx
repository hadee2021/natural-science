import React, { useState, useEffect } from 'react'
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { storage } from '../../core/firestore'
import { useEditQuestion } from '../../core/query'
import { useForm, Controller } from 'react-hook-form'
import { subjectObj, questionObj } from '../../module/subjectData'
import { Box, Button, TextField, MenuItem, Tooltip } from '@mui/material'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { questionDataAtom, IsQuestionUpdateAtom, IsQuickAddAtom } from '../../core/Atom'
import { useDeepCompareEffect } from 'use-deep-compare'
import { useQuestionList } from '../../core/query'

const QuestionForm = () => {
  /**업로드 */
  const [imageUpload, setImageUpload] = useState<any>()
  const [uploadFolderName, setUploadFolderName] = useState('')
  const [imageURL, setImageURL] = useState('')

  const upload = () => {
    if (imageUpload === null) return
    const imageRef = ref(storage, `${uploadFolderName}/${imageUpload.name}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url)
      })
    })
  }

  /**문제 제출  */
  const [inputSubject, setInputSubject] = useState<Subject>('physical')
  const [inputStep, setInputStep] = useState<string>('1단원 역학')
  const [inputYear, setInputYear] = useState<number>(2023)
  const [inputMonth, setInputMonth] = useState<number>(3)
  const [inputQNumber, setInputQNumber] = useState<number>(1)

  
  const navigate = useNavigate()
  const { 
    id: userId = '',
    subject = '',
    step = '',
  } = useParams()

  ///// 빠른 추가 시퀀스 구하기 ////
  const { questionList } = useQuestionList(subject, step)
  const [newQuestionSequence, setNewQuestionSequence] = useState(1)
  const [questionQuickAdd, setQuestionQuickAdd] = useRecoilState(IsQuickAddAtom)

  useEffect(() => {
    if(questionUpdate) {
      setNewQuestionSequence(questionList.length + 1)
    }
  }, [questionList])
  ////

  ///// 수정 ////
  const [questionData, setQuestionData] = useRecoilState(questionDataAtom)
  const [questionUpdate, setQuestionUpdate] = useRecoilState(IsQuestionUpdateAtom)
  ////

  useEffect(() => {
    setInputStep(questionData.step !== '' ? questionData.step : subjectObj[inputSubject].steps[0])
  }, [inputSubject])

  const questionForm = useForm<Question>({
    mode: 'all',
    reValidateMode: 'onChange'
  })

  ///// 수정 및 빠른추가 ////
  useDeepCompareEffect(() => {
    if(!questionUpdate) return
    setInputSubject(questionData.subject as Subject)
    setInputStep(questionData.step)
    setImageURL(questionData.imgSrc)
    setInputYear(questionData.questionYear)
    setInputMonth(questionData.questionMonth)
    setInputQNumber(questionData.questionNumber)
    questionForm.reset({
      questionSequence: questionData.questionSequence !== 1 ? questionData.questionSequence: 1,
      questionAnswer: questionData.questionAnswer !== 1 ? questionData.questionAnswer : 1,
      questionScore: questionData.questionScore !== 1 ? questionData.questionScore : 1
    })
  },[questionData])
  //////////////

  //빠른추가 //
  useEffect(() => {
    if(!questionQuickAdd) return
    questionForm.reset({
      questionSequence: newQuestionSequence
    })
  },[newQuestionSequence])
  ///////////

  const { 
    handleSubmit,
    control,
    register,
  } = questionForm

  ////// 수정 /////
  let questionUpdateId
  if(questionData.id !== '') {
    questionUpdateId = questionData.id
  }
  else if(questionData.id === '') {
    questionUpdateId = undefined
  }
  ////////////////

  const {
    editQuestion,
    isLoading: isSaving
  } =  useEditQuestion(subjectObj[inputSubject].subject, inputStep, questionUpdateId) //id 는 수정로직


  const OnSave = handleSubmit(form => {
    if(isSaving) return

    const {
      questionYear,
      questionMonth,
      questionNumber,
      questionSequence,
      questionAnswer,
      questionScore
    } = form


    const nextQuestionForm = {
      subject: subjectObj[inputSubject].subject,
      step: inputStep,
      imgSrc: imageURL,
      questionYear: questionYear,
      questionMonth: questionMonth,
      questionNumber: questionNumber,
      questionSequence: questionSequence,
      questionAnswer: questionAnswer,
      questionScore: questionScore
    }

    editQuestion(nextQuestionForm)

    setQuestionData({
      ...questionData,
      step : '',
      questionSequence : 1,
    })
    setQuestionUpdate(false) // 수정 끝
    setQuestionQuickAdd(false) // 빠른추가 끝

    navigate(`/main/${userId}`)
  })

  return (
    <QuestionFormWrapper>
      <div className="title">
        <h3>
          관리자 전용 문제 제출 양식
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
                  onChange={(e) => setInputSubject(e.target.value as Subject)}
                >
                  { 
                    subjectObj.subjects.map((subject, i) => (
                      <MenuItem value={subject.id} key={i}>{subject.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className="step">
            <Controller
              name="step"
              control={control}
              render={() => (
                <TextField
                  sx={{ width: '150px'}}
                  select
                  label="단원"
                  value={inputStep}
                  size="small"
                  onChange={(e) => setInputStep(e.target.value)}
                >
                  { 
                    subjectObj[inputSubject as Subject].steps.map((step, i) => (
                      <MenuItem value={step} key={i}>{step}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className="year">
            <Controller
              name="questionYear"
              control={control}
              render={() => (
                <TextField
                  sx={{ width: '150px'}}
                  select
                  label="학년도"
                  size="small"
                  value={inputYear}
                  {...register("questionYear")}
                  onChange={(e) => setInputYear(Number.parseInt(e.target.value))}
                >
                  {
                    questionObj.years.map((year, i) => (
                      <MenuItem value={year} key={i}>{year}</MenuItem>
                    ))
                  }
                </TextField>
              )}
            />
          </div>
          <div className="month">
            <Controller
              name="questionMonth"
              control={control}
              render={() => (
                <TextField
                  select
                  label="월"
                  size="small"
                  value={inputMonth}
                  {...register("questionMonth")}
                  onChange={(e) => setInputMonth(Number.parseInt(e.target.value))}
                >
                  {
                    questionObj.months.map((month, i) => (
                      <MenuItem value={month} key={i}>{month}</MenuItem>
                    ))
                  }
                </TextField>
              )}
            />
          </div>
          <div className="number">
            <Controller
              name="questionNumber"
              control={control}
              render={() => (
                <TextField
                  sx={{ width: '150px'}}
                  select
                  label="문항 번호"
                  size="small"
                  value={inputQNumber}
                  {...register("questionNumber")}
                  onChange={(e) => setInputQNumber(Number.parseInt(e.target.value))}
                >
                  {
                    questionObj.numbers.map((number, i) => (
                      <MenuItem value={number} key={i} >{number}</MenuItem>
                    ))
                  }
                </TextField>
              )}
            />
          </div>
        </LeftSection>
        <RightSection>
          <div className="sequence">
            <Controller
              name="questionSequence"
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
                    // value={newQuestionSequence}
                    {...register("questionSequence")}
                    onChange={(e) => setNewQuestionSequence(Number(e.target.value))}
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
            {newQuestionSequence}
          </div>
          <div className="score">
            <Controller
              name="questionScore"
              control={control}
              rules={{
                required: "점수는 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="점수는 1 2 3 .." placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="점수"
                    variant="standard"
                    {...register("questionScore")}
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
          <div className="answer">
            <Controller
              name="questionAnswer"
              control={control}
              rules={{
                required: "정답은 필수 입니다."
              }}
              render={({ fieldState }) => (
                <Tooltip title="정답은 1 2 3 .." placement="bottom">
                  <TextField
                    error={Boolean(fieldState.error)}
                    required
                    label="정답"
                    variant="standard"
                    {...register("questionAnswer")}
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
      <div className="file-upload">
        <p>문제 사진 업로드</p>
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
          onClick={upload}
          variant="contained"
          disabled={uploadFolderName === ''}
        >
          업로드
        </Button>
        <span>
          ex. A폴더 / B폴더 / ...
        </span>
      </div>
      <Button
        variant="contained"
        disabled={imageURL === ''}
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

export default QuestionForm

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
  border-bottom: 1px solid orangered;
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