import NavBar from './NavBar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../img/logo.svg'


const PageHeader = (props) => {
  const [searchKey, setSearchKey] = useState('')

  let navigate = useNavigate()
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchKey !== '') navigate(`/?name=${searchKey}`, { replace: true })
      if (searchKey === '') navigate(`/`, { replace: true })
    }
  }
  const changeSearch = (e) => {
    setSearchKey(e.target.value)
  }

  return (
    <div className='bg-slate-900 p-2 rounded-b-3xl border-solid border-b-2 border-slate-700 inset-x-o top-0 fixed w-screen z-40'>
      <div className='container xl:max-w-screen-xl mx-auto flex flex-row'>
        <div className='flex mb-2'>
          <img src={logo} alt="" className='h-auto w-20' />
        </div>
        <div className='p-2 w-1/2 flex-auto flex items-center'>
          <input type="text" placeholder={`Search for anything...`} className='block h-10 w-full bg-slate-800 rounded-md hover:bg-slate-700 px-4 py-2 text-white m-auto' onKeyDown={handleSearch} onChange={changeSearch} value={searchKey} />
        </div>
        <div className='w-1/5 flex-auto'>
          <NavBar />
        </div>

      </div>
    </div>
  )
}

export default PageHeader