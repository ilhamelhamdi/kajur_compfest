import logo from '../img/logo.svg'
import NavBar from './NavBar'
import { useContext } from 'react'
import { IsMobileContext } from '../context'

const PageHeader = () => {
  const isMobile = useContext(IsMobileContext)

  return (
    <div className='bg-slate-900 px-2 py-6 lg:p-2 rounded-b-3xl border-solid border-b-2 border-slate-700 inset-x-o top-0 fixed w-screen'>
      <div className='container xl:max-w-screen-xl mx-auto flex flex-row flex-wrap lg:flex-nowrap'>
        <div className='w-full lg:w-1/4 flex mb-2 lg:flex-1'>
          <img src={logo} alt="" className='h-16 lg:h-auto lg:w-20' />

          {isMobile &&
            <p className='text-white'>
              <span className='font-bold text-3xl'>Hi, User!</span><br />
              <span className='text-lg'>Let's start shopping!</span>
            </p>
          }

        </div>
        <div className='p-2 w-full  lg:w-1/2 lg:flex-auto flex items-center'>
          <input type="text" placeholder={`Search for anything...`} className='block h-10 w-full bg-slate-800 rounded-md hover:bg-slate-700 px-4 py-2 text-white m-auto' />
        </div>

        {!isMobile &&
          <div className='w-1/4 flex-auto'>
            <NavBar />
          </div>
        }
      </div>
    </div>
  )
}

export default PageHeader