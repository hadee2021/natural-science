import React from 'react'
import {
  Routes, Route, BrowserRouter,
} from 'react-router-dom'
import Start from './pages/Start'
import Main from './pages/Main'
import MainHome from './components/MainPage/MainHome'
import PrivateRoute from './router/PrivateRoute'
import MainReview from './components/MainPage/MainReview'
import MainPriciple from './components/MainPage/MainPriciple'
import Study from './pages/Study'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/main/:id" element={<Main/>}>
          <Route index element={<MainHome/>}/>
          <Route path="form" element={<PrivateRoute/>}/>
          <Route path="review" element={<MainReview/>} />
          <Route path="principle" element={<MainPriciple/>}/>
        </Route>
        <Route path="/study/:step" element={<Study/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router