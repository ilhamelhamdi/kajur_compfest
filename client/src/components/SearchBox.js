import { useNavigate } from "react-router-dom"
import { useState } from "react"

const SearchBox = () => {
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
    <input type="text" placeholder={`Search for anything...`} className='block h-10 w-full bg-slate-800 rounded-md hover:bg-slate-700 px-4 py-2 text-white m-auto' onKeyDown={handleSearch} onChange={changeSearch} value={searchKey} />
  )
}

export default SearchBox