import React from 'react'
import styled from 'styled-components'
import { getSubjectFontColor } from '../../module/styleFunc'

interface Props {
  subject: string
  setTabSubject: React.Dispatch<React.SetStateAction<string>>
}

interface SubjectFont {
  subject: string
}

const SubjectButton = ({subject, setTabSubject}: Props) => {
  return (
    <SubjectButtonWrapper
      subject={subject}
    >
      <button
        onClick={() => setTabSubject(subject)}
      >
        #{subject}
      </button>
    </SubjectButtonWrapper>
  )
}

export default SubjectButton

const SubjectButtonWrapper = styled.div`

  button {
    ${({subject}: SubjectFont) => getSubjectFontColor(subject)}
    font-size: 20px;
    font-weight: bold;
    margin-right: 15px;
    cursor: pointer;
    background: white;
    border: 1px solid;
    border-radius: 8px;
  }

  button:focus,
  button:active {
    outline: none;
    box-shadow: none;
  }
  
`