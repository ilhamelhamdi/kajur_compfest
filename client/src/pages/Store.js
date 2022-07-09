/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useCookies } from 'react-cookie'

import { IsMobileContext, NotificationContext } from '../context'
import { API_URL } from '../config'
import APIUtils from '../utils/APIUtils'
import NotifUtils from '../utils/NotifUtils'

import Template from './Template'
import MobileHeader from '../components/MobileHeader'
import SearchBox from '../components/SearchBox'
import { ItemCard, ItemCardSkeleton } from '../components/ItemCard'
import Button from '../components/Button'
import Icon from '../img'
import EmptyImage from '../img/empty.png'


const StoreContent = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  const [sortByDate, setSortByDate] = useState(searchParams.get('sort_date') || 'none')
  const [sortByName, setSortByName] = useState(searchParams.get('sort_name') || 'none')

  const [cookies, setCookies] = useCookies()
  const notification = useContext(NotificationContext)

  let navigate = useNavigate()
  let query = ''

  const fetchItems = async () => {
    try {
      const res = await APIUtils.get(`${API_URL}/items${query}`)
      if (res.body.items.length === 0) setIsEmpty(true)
      setItems(res.body.items)
      setIsLoaded(true)
    } catch (err) {
      setIsLoaded(false)
      setError(err)
    }
  }

  const handleSortByDate = (e) => {
    setSortByDate(e.target.value)
  }
  const handleSortByName = (e) => {
    setSortByName(e.target.value)
  }

  useEffect(() => {
    query = '?'
    if (sortByDate !== 'none') {
      query += `sort_date=${sortByDate}&`
    }
    if (sortByName !== 'none') {
      query += `sort_name=${sortByName}&`
    }
    if (searchParams.get('name') !== null || '') {
      query += `name=${searchParams.get('name')}&`
    }
    navigate(query, { replace: true })
    setIsLoaded(false)
  }, [sortByDate, sortByName, searchParams.get('name')])


  useEffect(() => {
    fetchItems()
  }, [sortByDate, sortByName, searchParams.get('name')])

  if (error) {
    return <div className='w-screen min-h-screen'>Error: {error.message}</div>
  } else if (isEmpty) {
    return (
      <>
        <div className="container xl:max-w-screen-xl mx-auto flex flex-col justify-center font-mono text-center mt-20 px-4 lg:mt-0 pt-20 lg:pt-0">
          <div className=" text-sky-500 text-8xl  font-bold">Empty Stock</div>
          <div className="text-white text-3xl font-bold mb-8">It looks like the store has no product yet.</div>
          <div className='max-w-6xl flex justify-center'>
            <img src={EmptyImage} alt="" className='' />
          </div>
        </div>
        <Link to={'add-product'}>
          {/* <div className='animate-ping w-4 h-4 rounded-full bg-sky-500'></div> */}
          <Button name={<span className='text-5xl lg:text-6xl font-bold '>+</span>} className="fixed bottom-24 right-4 lg:bottom-20 lg:right-20 rounded-full h-16 w-16 lg:h-20 lg:w-20 flex justify-center text-slate-900 bg-sky-500 lg:text-sky-500 lg:bg-slate-900 animate-bounce transition hover:animate-none" />
        </Link>
      </>
    )
  } else {
    return (
      <div className='w-screen'>
        <div className='container xl:max-w-screen-xl mx-auto px-2 mt-40 lg:mt-0'>
          <div className='text-white mb-4'>
            <p className='inline-block'>Sort by</p>
            <select value={sortByDate} onChange={handleSortByDate} className='inline-block bg-slate-800 hover:bg-slate-700 rounded-lg ml-4 text-center p-1'>
              <option value="none">Date</option>
              <option value="latest">Date : Latest</option>
              <option value="oldest">Date : Oldest</option>
            </select>
            <select value={sortByName} onChange={handleSortByName} className='inline-block bg-slate-800 hover:bg-slate-700 rounded-lg ml-4 text-center p-1'>
              <option value="none">Name</option>
              <option value="asc">Name : Ascending</option>
              <option value="desc">Name : Descending</option>
            </select>
          </div>
          <div className='flex flex-wrap justify-center'>
            {isLoaded ?
              items.map(item => (<ItemCard data={item} key={item._id} />)) :
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <ItemCardSkeleton key={i} />)
            }
          </div>
        </div>
        <Link to={'add-product'}>
          <Button name={<span className='text-5xl lg:text-6xl font-bold '>+</span>} className="fixed bottom-24 right-4 lg:bottom-20 lg:right-20 rounded-full h-16 w-16 lg:h-20 lg:w-20 flex justify-center text-slate-900 bg-sky-500 lg:text-sky-500 lg:bg-slate-900" />
        </Link>
      </div>
    )
  }
}

const Store = () => {
  const isMobile = useContext(IsMobileContext)
  return (
    <Template>
      {isMobile &&
        <MobileHeader className="flex-col">
          <div className='flex mb-4'>
            <Icon.Logo className="w-20" />
            <div>
              <p className='text-white text-xl'>
                Welcome to <span className='font-bold text-sky-500'>SEA Canteen</span>
              </p>
              <p className='text-slate-400 text-lg'>Let's start shopping!</p>
            </div>
          </div>
          <SearchBox />
        </MobileHeader>
      }
      <StoreContent />
    </Template>
  )
}

export default Store