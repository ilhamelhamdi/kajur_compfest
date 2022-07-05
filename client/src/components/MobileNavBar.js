import NavBar from './NavBar'

const MobileNavBar = () => {
  return (
    <div className='bg-slate-900 -bottom-1 left-0 right-0 fixed rounded-t-3xl border-solid border-t-2 border-slate-700'>
      <div className='container max-w-lg mx-auto px-2 flex justify-center'>
        <NavBar />
      </div>
    </div>
  )
}

export default MobileNavBar