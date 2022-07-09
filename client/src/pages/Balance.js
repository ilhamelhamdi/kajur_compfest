/* eslint-disable react/jsx-pascal-case */
import { IsMobileContext, NotificationContext } from "../context"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useCookies } from "react-cookie"
import { API_URL } from "../config"
import Button from "../components/Button"
import Notification from "../components/Notification"
import APIUtils from "../utils/APIUtils"
import NotifUtils from "../utils/NotifUtils"
import Template from "./Template"
import MobileHeader from "../components/MobileHeader"
import Icon from "../img"

const BalanceContent = () => {
  // STATES
  const [yourBalance, setYourBalance] = useState(0)
  const [storeBalance, setStoreBalance] = useState(0)
  const [error, setError] = useState(null)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  const notification = useContext(NotificationContext)
  const [cookies, setCookies] = useCookies()

  const [searchParams] = useSearchParams()

  const changeBalanceInput = (e) => {
    let value = e.target.value
    if (value < 0) value = 0
    setYourBalance(value)
  }

  // Popping up notification prompt
  const addBalance = (e) => {
    const data = {
      action: 'add',
      amount: yourBalance
    }
    notification.setTitle('Add Balance')
    notification.setMessage(`Are you sure you want to add Rp${yourBalance} to store's balance?`)
    notification.setActions([
      {
        name: 'Cancel',
        action: () => notification.setFlag(false)
      },
      {
        name: 'Add',
        action: async () => {
          NotifUtils.onLoadingAction(notification)
          const res = await APIUtils.put(API_URL + '/balance', data, cookies.token)
          if (res.status === 'success') {
            NotifUtils.onSuccessAction(notification, `Your balance has been added successfully to store's balance`)
            getStoreBalance()
          }
        }
      }
    ])
    notification.setFlag(true)
  }

  // Popping Up Notification Prompt or Error
  const withdrawBalance = (e) => {
    const data = {
      action: 'withdraw',
      amount: yourBalance
    }

    if (yourBalance > storeBalance) {
      notification.setMessage('Your balance exceeds store\'s balance.\nThe maximum amount can be withdrawn is store\'s current balance.')
      notification.setActions([{
        name: <span>OK</span>,
        action: () => notification.setFlag(false)
      }])
    }
    else {
      notification.setMessage(`Are you sure you want to withdraw Rp${yourBalance} from store's balance?`)
      notification.setActions([
        {
          name: 'Cancel',
          action: () => notification.setFlag(false)
        },
        {
          name: 'Withdraw',
          action: async () => {
            NotifUtils.onLoadingAction(notification)
            const res = await APIUtils.put(API_URL + '/balance', data, cookies.token)
            if (res.status === 'success') {
              NotifUtils.onSuccessAction(notification, `Your balance has been withdrawn successfully from store's balance`)
              getStoreBalance()
            }
          }
        }
      ])
    }

    notification.setTitle('Withdraw Balance')
    notification.setFlag(true)
  }


  // INPUT UTILITIES
  // Prevent user from inputting invalid key to balance box
  const preventInvalidBalance = (e) => {
    const invalidChars = ['-', '+', 'e', '.']
    if (invalidChars.includes(e.key)) e.preventDefault()
  }

  // INPUT UTILITIES
  // Normalize input balance onBlur
  const normalizeInputBalance = (e) => {
    let normalized = Number.parseInt(e.target.value) || 0
    setYourBalance(normalized)
    document.getElementById('your-balance').value = normalized
  }

  // API UTILITIES
  // Data Fetching of Store Balance
  const getStoreBalance = async () => {
    try {
      const res = await APIUtils.get(`${API_URL}/balance`, cookies.token)
      setStoreBalance(res.balance)
      setIsDataLoaded(true)
    } catch (err) {
      setError(err)
      setIsDataLoaded(false)
    }
  }

  // Fetching data at beginning
  useEffect(() => {
    if (cookies.isLogged === '1') getStoreBalance()
    setYourBalance(searchParams.get('price') || '');
  }, [searchParams])

  // Focusing on Your Balance Box at beginning
  useEffect(() => {
    if (isDataLoaded) {
      document.getElementById('your-balance').focus()
    }
  }, [isDataLoaded])


  // Render Elements
  if (error) {
    return <div className='w-screen min-h-screen'>Error: {error.message}</div>
  } else {
    return (
      <div className="container xl:max-w-screen-xl flex flex-col lg:flex-row mx-auto text-white pt-20">
        {/* Desktop Left Side */}
        <div className="lg:w-1/2 px-4 lg:pr-6 lg:pl-0 mb-4">
          <div className="w-full text-center rounded-xl overflow-hidden">
            <p className="text-4xl  bg-slate-800 py-4">Store's Balance (Rp)</p>
            <p className="block text-7xl py-12 font-bold bg-slate-200 text-slate-900">{
              isDataLoaded ? storeBalance.toLocaleString('id-ID') : 'Loading...'
            }</p>
          </div>
          <div className="w-full mt-6">
            <p className="text-3xl font-bold text-sky-500 mb-4">Guidance</p>
            <ul className="list-decimal pl-4">
              <li>The <b>Store's Balance</b> is the amount of money which is avalaible now.</li>
              <li>You can input certain amount of money on the <b>Your Balance</b> box.</li>
              <li>You can <b>Add</b> or <b>Withdraw</b> certain amount of money from <b>Store's Balance</b> corresponding with <b>Your Balance</b> value.</li>
              <li>You can <b>add</b> up money as much as you want.</li>
              <li>The maximum amount can be withdrawn is the canteen's current balance.</li>
              <li>Please be <b>HONEST</b>.</li>
            </ul>
          </div>
        </div>
        {/* Desktop Right Side */}
        <div className=" lg:w-1/2 h-full lg:pl-6 lg:pr-0 flex flex-col px-4">
          <div className="w-full text-center rounded-xl overflow-hidden">
            <p className="text-4xl  bg-slate-800 py-4">Your Balance (Rp)</p>
            <input type="number" value={yourBalance} className="block w-full text-7xl py-8 font-bold bg-slate-200 text-slate-900 text-center" onChange={changeBalanceInput} onBlur={normalizeInputBalance} onWheel={e => { e.target.blur() }} onKeyDown={preventInvalidBalance} id="your-balance" placeholder="input here" />
          </div>
          <Button className='h-16 text-2xl font-bold mt-6' name='Add' onClick={addBalance} />
          <Button className='h-16 text-2xl font-bold mt-6' name='Withdraw' onClick={withdrawBalance} />
        </div>
      </div>
    )
  }
}

const Balance = () => {
  const isMobile = useContext(IsMobileContext)
  const notification = useContext(NotificationContext)
  const [cookies, setCookies] = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies.isLogged !== '1') NotifUtils.loginPrompt(notification, navigate)
  }, [])

  return (
    <>
      {notification.flag && <Notification.Template />}
      <Template>
        {isMobile &&
          <MobileHeader>
            <Icon.Back onClick={() => navigate(-1)} className="fill-white w-8 ml-2" />
            <div className="text-2xl text-white w-full text-center">Balance</div>
          </MobileHeader>
        }
        <BalanceContent />
      </Template>
    </>
  )
}

export default Balance