import React from 'react'
import styled from 'styled-components'
import Atropos from 'atropos/react'

const MainWorkBook = () => {
  return (
    <div>
      <WorkBookWraaper>
        <Atropos 
          shadow={false}
        >
          <img src="/PIC/수특 물리.png" data-atropos-offset="5" />
        </Atropos>
        <Atropos 
          shadow={false}
        >
          <img src="/PIC/수특 기하.png" data-atropos-offset="5" />
        </Atropos>
        <Atropos 
          shadow={false}
        >
          <img src="/PIC/수특 영어.png" data-atropos-offset="5" />
        </Atropos>
      </WorkBookWraaper>
    </div>
  )
}

export default MainWorkBook

const WorkBookWraaper = styled.div`
  
  display: flex;
  gap: 25px;
  margin-left: 100px;

  img {
    width: 180px;
    cursor: pointer;
  }
`