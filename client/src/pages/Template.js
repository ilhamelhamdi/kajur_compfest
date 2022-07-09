import { useContext } from 'react'
import MobileNavBar from '../components/MobileNavBar'
import PageHeader from '../components/PageHeader'
import { IsMobileContext } from '../context'


const Template = ({ children, mobileHeader, className }) => {
  const isMobile = useContext(IsMobileContext)
  const classHeader = mobileHeader && 'pt-48'

  return (
    <div className={`bg-slate-900 min-h-screen overflow-x-hidden pb-24 scroll-smooth box-border lg:pt-24 ${classHeader}`}>
      {!isMobile && <PageHeader />}
      {children}
      {isMobile && <MobileNavBar />}
    </div>
  )
}

export default Template