/* eslint-disable react/jsx-pascal-case */
import { useState, useEffect, useContext } from 'react'

import _Template from './_Template'
import ItemCard from '../components/ItemCard'
import MobileNavBar from '../components/MobileNavBar'
import { IsMobileContext } from '../context'
import { useNavigate, useSearchParams } from "react-router-dom"
import { API_URL } from '../config'

const StoreBody = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [sortByDate, setSortByDate] = useState(searchParams.get('sort_date') || 'none')
  const [sortByName, setSortByName] = useState(searchParams.get('sort_name') || 'none')

  let navigate = useNavigate()
  let query = ''
  // if (sortByDate !== 'none') {
  //   query += `sort_date=${sortByDate}&`
  // }
  // if (sortByName !== 'none') {
  //   query += `sort_name=${sortByName}&`
  // }

  const callAPI = () => {
    fetch(`${API_URL}/items${query}`)
      .then(res => res.json())
      .then(res => {
        setIsLoaded(true)
        setItems(res.body.items)
      })
      .catch(err => {
        setIsLoaded(true)
        setError(err)
      })
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
    navigate(query, { replace: true })
    setIsLoaded(false)
  }, [sortByDate, sortByName])

  useEffect(() => {
    callAPI()
  }, [sortByDate, sortByName])

  if (error) {
    return <div className='w-screen min-h-screen'>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div className='w-screen min-h-screen'>
      <p className='container mx-auto min-h-screen text-6xl text-white text-center align-middle'>Loading...</p>
    </div>
  } else {
    return (
      <div className='w-screen'>
        <div className='container xl:max-w-screen-xl mx-auto px-2'>
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
            {items.map(item => (
              <ItemCard data={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const Store = () => {
  const isMobile = useContext(IsMobileContext)
  return (
    <_Template>
      <StoreBody />
      {isMobile && <MobileNavBar />}
    </_Template>
  )
}

export default Store