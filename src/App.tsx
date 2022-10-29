import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import Router from './Router'

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
    </QueryClientProvider>
  )
}

export default App
