import { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import MobileHeader from '../components/MobileHeader'
import { API_URL } from '../config'
import { IsMobileContext } from '../context'
import Icon from '../img'
import APIUtils from '../utils/APIUtils'
import Template from "./Template"


const AccountContent = () => {
  const [user, setUser] = useState({})

  const navigate = useNavigate()
  const [cookies, setCookies, removeCookies] = useCookies()

  const onLogout = () => {
    removeCookies('isLogged', { path: '/' })
    removeCookies('token', { path: '/' })
    removeCookies('userId', { path: '/' })
    removeCookies('userName', { path: '/' })
    navigate('/')
  }

  return (
    <div className='container xl:max-w-screen-xl mx-auto px-4 py-6 text-white pt-20 lg:pt-0'>
      <div className='text-2xl text-sky-500'>Profile</div>
      <div className=''>
        <div className='w-40 h-40 rounded-full bg-slate-800 mx-auto overflow-hidden'>
          <Icon.Account className="fill-white" />
        </div>
      </div>
      <div>
        <div className='mb-4'>
          <div className='text-sky-500'>Student Id</div>
          <div>{cookies.userId}</div>
        </div>
        <div className='mb-4'>
          <div className='text-sky-500'>Full Name</div>
          <div>{cookies.userName}</div>
        </div>
      </div>
      <Button name="Log Out" onClick={onLogout} className="block w-full text-xl font-bold h-12" />
    </div>
  )
}

const AuthPrompt = () => {
  const navigate = useNavigate()

  const onLogin = () => {
    navigate('../login')
  }
  const onRegister = () => {
    navigate('../register')
  }

  return (
    <div className='container xl:max-w-screen-xl mx-auto  p-4 space-y-4 pt-20 lg:pt-0'>
      <Button name="Login" onClick={onLogin} className="block w-full text-xl font-bold h-12" />
      <Button name="Register" onClick={onRegister} className="block w-full text-xl font-bold h-12" />
    </div>
  )
}

const Account = () => {
  const [cookies, setCookies] = useCookies()
  const isMobile = useContext(IsMobileContext)
  const navigate = useNavigate()

  return (
    <Template>
      {isMobile &&
        <MobileHeader>
          <Icon.Back onClick={() => navigate(-1)} className="fill-white w-8 ml-2" />
          <div className="text-2xl text-white w-full text-center">Account</div>
        </MobileHeader>
      }
      {cookies.isLogged === '1' ?
        <AccountContent /> :
        <AuthPrompt />
      }
    </Template>
  )
}

export default Account