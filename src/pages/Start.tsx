import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useCreateUser, useFindUser } from '../core/query'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, IconButton } from '@mui/material'
import { Lock, LockOpen} from '@mui/icons-material'
import { useState } from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Atropos from 'atropos/react'

interface UserForm {
  userName: string
  userPwd: string
}

const Start = () => {
  const[showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const {
    control,
    watch,
    formState,
    register,
    handleSubmit,
  } = useForm<UserForm>({
    mode: 'all',
    defaultValues: {
      userName: '',
      userPwd: '',
    }
  })

  const { userName, userPwd } = watch()
  const { errors } = formState

  /** 스터디 메인으로 이동 */
  const navigate = useNavigate()
  const { user, isSuccess } = useFindUser(userName.trim(), userPwd)
  const {
    createUser,
    userId: newUserId
  } = useCreateUser()

  const goToMain = handleSubmit(() => {
    // 유저가 없으면 신규 유저홈 생성
    if(!user) {
      createUser(userName.trim(), userPwd)
      navigate(`/main/${newUserId}`, { replace: true })
      return
    }
    // 유저가 있으면 유저 홈으로 이동
    navigate(`/main/${user.id}`, { replace: true })
  })

  const goToDemo = () => {
    navigate(`/main/2rvUM`, { replace: true })
  }

  const [tab, setTab] = useState('')

  return (
    <StartWrapper>
      {/* <div>
        dddd
      </div> */}
      <Atropos
        shadow={false}
      >
        <StartContainer>
          <Box sx={{mb: 3}} >
            <Typography fontSize="1.8rem" lineHeight={1.5}>
              Hadee`s
            </Typography>
            <Typography fontSize="1.8rem" lineHeight={1.5}>
              과학 탐구 영역
            </Typography>
          </Box>
          { tab === '' &&
            <>
              <DemoDescript data-atropos-offset="5">
                <span data-atropos-offset="5">
                  과학 탐구 영역 공부중 이신가요 ??<br/>
                  킬러문제 원칙을 학습하세요<br/>
                  시연하기를 통해 체험해 보고<br/>
                  자신만의 스터디룸을 구성해보세요<br/>
                  ( 개인정보 필요없음 )
                </span>
              </DemoDescript>
              <TabMenu>
                <Button 
                  variant="contained" 
                  color="info"
                  sx = {{ 
                    background : "lightskyblue",
                    fontWeight: "bold"
                  }}
                  onClick={() => goToDemo()}
                >
                  시연하기
                </Button>
                <Button 
                  variant="contained" 
                  color="info"
                  sx = {{ 
                    background : "lightskyblue",
                    fontWeight: "bold"
                  }}
                  onClick={() => setTab('login')}
                >
                  스터디룸
                </Button>
              </TabMenu>
            </>
          }
          { tab === 'login' &&
            <>
              <span
                onClick={() => setTab('')}
              >
                <ArrowBackIcon
                  style={{ 
                    cursor: "pointer",
                    color: "#2F74C0"
                  }}
                />
              </span>
              <Box>
                <Controller 
                  name="userName"
                  control={control}
                  rules={{
                    required: "사용자 이름은 필수 입니다",
                    minLength: {
                      value: 2,
                      message: "2글자 이상 입력 하세요",
                    },
                  }}
                  render={({ fieldState }) => (
                    <TextField 
                      error={Boolean(fieldState.error)}
                      required
                      label="User NickName (필수)"
                      variant="standard"
                      {...register('userName')}
                      fullWidth
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
                  )}
                />
                <Box>
                  <TextField 
                    error={Boolean(errors.userPwd)}
                    label="비밀번호 (선택)"
                    variant="standard"
                    {...register('userPwd')}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <LockOpen /> : <Lock />}
                        </IconButton>
                      )
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{mt: 5}}
                  fullWidth
                  onClick={() => {
                    if(isSuccess) goToMain()
                  }}
                >
                  시작하기
                </Button>
              </Box>
            </>
          }
        </StartContainer>
      </Atropos>
    </StartWrapper>
  )
}

export default Start

const StartWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: aliceblue;
`

const StartContainer = styled.div`
  padding: 20px;
  border-radius: 9px;
  width: 350px;
  height: 400px;
  background-color: white;
  box-shadow: 2px 4px #eee;

  
`


const DemoDescript = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 107px;
  background: #f7f8f9;
  border-radius: 8px;
  padding: 15px;
  line-height: 1.7;
  font-size: 16px;
  
`

const TabMenu = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 40px;

  > div {
    border: 1px solid lightskyblue;
    padding: 10px 15px;
    border-radius: 9px;
    cursor: pointer;
    background-color: lightskyblue;
  }
`