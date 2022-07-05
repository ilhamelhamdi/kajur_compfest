/* eslint-disable react/jsx-pascal-case */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { IsMobileContext } from './context';
import Product from './pages/Product';
import Balance from './pages/Balance';

const Store = lazy(() => import('./pages/Store'))

const App = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMobile(window.screen.width < 1024)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.screen.width < 1024) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
  }, [isMobile])


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={
            <IsMobileContext.Provider value={isMobile}>
              <Store />
            </IsMobileContext.Provider>
          } />
          <Route path="/product/:id" element={
            <IsMobileContext.Provider value={isMobile}>
              <Product />
            </IsMobileContext.Provider>
          } />
          <Route path="/balance" element={
            <IsMobileContext.Provider value={isMobile}>
              <Balance />
            </IsMobileContext.Provider>
          } />
        </Routes>
      </Suspense>
    </Router >
  )
}

export default App;
