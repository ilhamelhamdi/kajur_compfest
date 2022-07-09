const MobileHeader = (props) => {
  return (
    <div className='bg-slate-900 px-2 py-4 lg:p-2  border-solid border-b-2 border-slate-700 inset-x-o top-0 fixed w-screen z-40'>
      <div className={'container xl:max-w-screen-xl mx-auto flex ' + props.className}>
        {props.children}
      </div>
    </div>
  )
}

export default MobileHeader