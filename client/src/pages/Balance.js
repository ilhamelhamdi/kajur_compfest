/* eslint-disable react/jsx-pascal-case */
import _Template from "./_Template"
import { IsMobileContext } from "../context"
import { useContext, useEffect, useState } from "react"
import MobileNavBar from "../components/MobileNavBar"
import { useSearchParams } from "react-router-dom"
import { API_URL } from "../config"

const BalanceContent = () => {
  const [yourBalance, setYourBalance] = useState(0)
  const [storeBalance, setStoreBalance] = useState(0)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const balanceChange = (e) => {
    let value = e.target.value
    if (value === '') value = 0
    if (value[0] === '0') value = value.slice(1)
    setYourBalance(value)
  }

  const getStoreBalance = () => {
    fetch(`${API_URL}/balance`)
      .then(res => res.json())
      .then(res => {
        setStoreBalance(res.balance)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setIsLoaded(true)
      })
  }

  useEffect(() => {
    getStoreBalance()
    setYourBalance(searchParams.get('price'));
  }, [])


  useEffect(() => {
    if (isLoaded) {
      document.getElementById('your-balance').focus()
    }
  }, [isLoaded])

  if (error) {
    return <div className='w-screen min-h-screen'>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div className='w-screen min-h-screen'>
      <p className='container mx-auto min-h-screen text-6xl text-white text-center align-middle'>Loading...</p>
    </div>
  } else {
    return (
      <div className="flex flex-col lg:flex-row max-w-xl lg:max-w-max mx-auto text-white">
        <div className="lg:w-1/2 lg:pr-6">
          <div className="w-full text-center rounded-xl overflow-hidden">
            <p className="text-4xl  bg-slate-800 py-4">Store's Balance (Rp)</p>
            <p className="block text-7xl py-12 font-bold bg-slate-200 text-slate-900">{storeBalance}</p>
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
        <div className=" lg:w-1/2 h-full lg:pl-6 flex flex-col px-4">
          <div className="w-full text-center rounded-xl overflow-hidden">
            <p className="text-4xl  bg-slate-800 py-4">Your Balance (Rp)</p>
            <input type="number" value={yourBalance} className="block w-full text-7xl py-8 font-bold bg-slate-200 text-slate-900 text-center" onChange={balanceChange} id="your-balance" />
          </div>
          <button className="bg-slate-900 hover:bg-sky-500 border-4 border-solid border-sky-500 rounded-lg h-16 text-sky-500 hover:text-slate-900 text-2xl font-bold mt-6">Add</button>
          <button className="bg-slate-900 hover:bg-sky-500 border-4 border-solid border-sky-500 rounded-lg h-16 text-sky-500 hover:text-slate-900 text-2xl font-bold mt-6">Withdraw</button>
        </div>
      </div>
    )
  }
}

const BalanceDestop = () => (
  <_Template>
    <div className="w-screen box-border container xl:max-w-screen-xl mx-auto pt-4">
      <BalanceContent />
    </div>
  </_Template>
)

const BalanceMobile = () => (
  <div className='bg-slate-900 w-full min-h-screen overflow-x-hidden pb-24 scroll-smooth box-border'>
    <BalanceContent />
    <MobileNavBar />
  </div>
)

const Balance = () => {
  const isMobile = useContext(IsMobileContext)
  return isMobile ? <BalanceMobile /> : <BalanceDestop />
}

export default Balance