import React from 'react'
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom'
import Start from './pages/Start'
import Main from './pages/Main'
import MainHome from './components/MainPage/MainHome'
import PrivateRoute from './router/PrivateRoute'
import MainReview from './components/MainPage/MainReview'
import MainPrinciple from './components/MainPage/MainPrinciple'
import MainWorkBook from './components/MainPage/MainWorkBook'
import MainVideo from './components/MainPage/MainVideo'
import MainNotice from './components/MainPage/MainNotice'
import Study from './pages/Study'
import PrivateWorkBook from './router/PrivateWorkBook'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/main/:id" element={<Main/>}>
          <Route index element={<MainHome/>}/>
          <Route path="form" element={<PrivateRoute/>}/>
          <Route path="form/:subject/:step" element={<PrivateRoute/>}/>
          <Route path="review" element={<MainReview/>} />
          <Route path="principle" element={<MainPrinciple/>}/>
          <Route path="workbook" element={<MainWorkBook/>}/>
          <Route path="workbook/form" element={<PrivateWorkBook/>}/>
          <Route path="video" element={<MainVideo/>}/>
          <Route path="notice" element={<MainNotice/>}/>
        </Route>
        <Route path="/study/:id/:subject/:step/:subjectId" element={<Study/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router