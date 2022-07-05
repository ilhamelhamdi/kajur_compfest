import PageHeader from '../components/PageHeader'

const _Template = (props) => {
  return (
    <div className='bg-slate-900 w-full min-h-screen overflow-x-hidden pt-48 lg:pt-24 pb-24 scroll-smooth box-border'>
      <PageHeader />
      {props.children}
    </div>
  )
}

export default _Template