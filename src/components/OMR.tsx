import React from 'react'
import styled from 'styled-components'

interface Props {
  omrMarking : boolean[]
  setOmrMarking : React.Dispatch<React.SetStateAction<boolean[]>>
}


const OMR = ({omrMarking, setOmrMarking}: Props) => {

  const mark = (markIndex: number) => {
    setOmrMarking((prev) => {
      prev.splice(markIndex, 1, !prev[markIndex])
      return [...prev]
    })
  }

  return (
    <OMRWrapper>
      <div 
        onClick={() => mark(0)}
        className={omrMarking[0] === true ? "marking" : ""}
      >
        1
      </div>
      <div 
        onClick={() => mark(1)}
        className={omrMarking[1] === true ? "marking" : ""}
      >
        2
      </div>
      <div 
        onClick={() => mark(2)}
        className={omrMarking[2] === true ? "marking" : ""}
      >
        3
      </div>
      <div 
        onClick={() => mark(3)}
        className={omrMarking[3] === true ? "marking" : ""}
      >
        4
      </div>
      <div 
        onClick={() => mark(4)}
        className={omrMarking[4] === true ? "marking" : ""}
      >
        5
      </div>
    </OMRWrapper>
  )
}

export default OMR

const OMRWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 150px;
  padding: 7px 0px;
  border: 1px solid skyblue;
  border-radius: 10px;
  background-color: #FFFDE6;

  > div {
    color: #F07CB0;
    border: 1px solid #F07CB0;
    padding: 1px 2px;
    border-radius: 10px;
    cursor: pointer;
  }

  .marking {
    background-color: black;
    color: black;
  }

  @media screen and (max-width: 520px) {
    width: 120px;
    font-size: 14px;
  }
`