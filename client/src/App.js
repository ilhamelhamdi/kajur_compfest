/* eslint-disable react/jsx-pascal-case */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { IsMobileContext, NotificationContext } from './context';
import Product from './pages/Product';
import Balance from './pages/Balance';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

const Store = lazy(() => import('./pages/Store'))

const App = () => {
  const [isMobile, setIsMobile] = useState(true)
  const [notifFlag, setNotifFlag] = useState(false)
  const [notifTitle, setNotifTitle] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [notifIsClosable, setNotifIsClosable] = useState(true)
  const [notifActions, setNotifActions] = useState([{ name: '', action: '' }])

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
  }, [isMobile])


  return (
    <IsMobileContext.Provider value={isMobile}>
      <NotificationContext.Provider value={{
        flag: notifFlag,
        title: notifTitle,
        message: notifMessage,
        actions: notifActions,
        isClosable: notifIsClosable,
        setFlag: (value) => setNotifFlag(value),
        setTitle: (value) => setNotifTitle(value),
        setMessage: (value) => setNotifMessage(value),
        setActions: (value) => setNotifActions(value),
        setIsClosable: (value) => setNotifIsClosable(value),
      }}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Store />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router >
      </NotificationContext.Provider>
    </IsMobileContext.Provider>
  )
}

export default App;
