import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      Main <br/>
      <Outlet/>
    </div>
  )
}

export default Main