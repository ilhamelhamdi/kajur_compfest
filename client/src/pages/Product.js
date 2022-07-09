/* eslint-disable react/jsx-pascal-case */
import Template from "./Template"
import { IsMobileContext, NotificationContext } from "../context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { API_URL } from "../config"
import EtcUtils from "../utils/EtcUtils"
import Button from "../components/Button"
import Notification from "../components/Notification"
import NotifUtils from "../utils/NotifUtils"
import APIUtils from "../utils/APIUtils"
import { useCookies } from "react-cookie"
import MobileHeader from "../components/MobileHeader"
import Icon from "../img"
import SearchBox from "../components/SearchBox"
import ImageUtils from "../utils/ImageUtils"

const ProductContent = () => {
  const [item, setItem] = useState({})
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()
  const [date, setDate] = useState({})

  const [cookies, setCookies] = useCookies()

  const notification = useContext(NotificationContext)
  const navigate = useNavigate()

  const clickBuy = () => {
    notification.setTitle('Buy Item')
    notification.setMessage(
      <span>Are you sure you want to buy this item? <span className="block text-red-600">Warning: By clicking 'Buy', this item would be removed automatically from store</span></span>
    )
    notification.setActions([
      {
        name: 'Cancel',
        action: () => notification.setFlag(false)
      },
      {
        name: 'Buy',
        action: async () => {
          NotifUtils.onLoadingAction(notification)
          const delImg = await ImageUtils.deleteImg(item.img.delete_url)
          const res = await APIUtils.del(API_URL + '/items/' + id, cookies.token)
          if (res.status === 'success') {
            notification.setMessage(`Your transaction is success. Please click 'Pay' Button to make payment.`)
            notification.setActions([{
              name: 'Pay',
              action: () => {
                notification.setIsClosable(true)
                notification.setFlag(false)
                navigate('../balance?price=' + item.price)
              }
            }])
            notification.setFlag(true)
          }
        }
      }
    ])
    notification.setFlag(true)
  }

  useEffect(() => {
    fetchItem(id)
  }, [id])

  const fetchItem = async (id) => {
    try {
      const res = await APIUtils.get(`${API_URL}/items/${id}`)
      setItem(res.body)
      setDate(EtcUtils.parseDate(res.body.updatedAt))
      setIsLoaded(true)
    } catch (err) {
      setIsLoaded(false)
      setError(err)
    }
  }

  if (error) {
    return <div className='w-screen min-h-screen text-white text-3xl'>Item not found!</div>
  } else if (!isLoaded) {
    return <ProductSkeleton />
  } else {
    return (
      <div className="container xl:max-w-screen-xl mx-auto flex flex-col lg:flex-row pt-16 lg:pt-0">

        {/* LEFT SIDE */}
        <div className="lg:w-2/5 mb-4" >
          <div className="rounded-xl relative overflow-hidden" style={{ paddingTop: '100%' }}>
            {/* Image */}
            <img src={item.img.url} alt="" className="w-full absolute inset-0" />
          </div>
        </div>

        {/* Right Side */}
        <div className=" lg:w-3/5 h-full text-white lg:pl-12 flex flex-col px-4">

          {/* Product Name */}
          <div className="text-3xl lg:text-5xl mb-4">{item.name}</div>

          {/* Product Price */}
          <div className="text-4xl lg:text-6xl pb-4 mb-1 font-bold border-b-2 border-solid border-slate-500 text-sky-500">Rp{item.price.toLocaleString('id-ID')}</div>

          {/* Product Created/Updated Date */}
          <div className="text-right text-slate-400">
            {
              (item.createdAt === item.updatedAt) ? 'Added' : 'Updated'
            } at {date.hour}:{date.minute} {date.month} {date.day}, {date.year}
          </div>

          {/* Product Description */}
          <div className="text-lg lg:text-2xl text-sky-500 mb-2">Description</div>
          <p className="mb-8">{
            item.desc.map((line, i) => (<span className="block" key={i}>{line}</span>))
          }</p>

          {/* Buy Button */}
          <Button name="Buy" className="h-16 text-3xl font-bold text-center" onClick={
            cookies.isLogged !== '1' ?
              () => NotifUtils.loginPrompt(notification, navigate) :
              clickBuy} />

        </div>
      </div>
    )
  }
}

const ProductSkeleton = () => (
  <div className="container xl:max-w-screen-xl mx-auto flex flex-col lg:flex-row animate-pulse">
    <div className="lg:w-2/5 mb-4" >
      <div className="rounded-xl bg-slate-700" style={{ paddingTop: '100%' }}></div>
    </div>
    <div className=" lg:w-3/5 h-full lg:pl-12 flex flex-col px-4">
      <div className=" h-6 lg:h-10 mb-4 bg-slate-700 rounded-xl"></div>
      <div className=" h-6 lg:h-10 mb-4 bg-slate-700 rounded-xl"></div>
      <div className="bg-slate-700 rounded-xl text-4xl lg:text-6xl h-12 lg:h-16 pb-4 mb-6 w-1/2"></div>
      <div className="h-3 w-full flex mb-4">
        <div className="h-full w-2/3"></div>
        <div className="h-full w-1/3 bg-slate-700 rounded-xl"></div>
      </div>
      <div className="h-6 bg-slate-700 rounded-xl w-1/4 mb-4"></div>
      <div className="mb-8 space-y-4">
        <div className="bg-slate-700 rounded-xl w-full h-4"></div>
        <div className="bg-slate-700 rounded-xl w-full h-4"></div>
        <div className="bg-slate-700 rounded-xl w-full h-4"></div>
        <div className="bg-slate-700 rounded-xl w-full h-4"></div>
        <div className="bg-slate-700 rounded-xl w-full h-4"></div>
      </div>
    </div>
  </div>
)


const Product = () => {
  const isMobile = useContext(IsMobileContext)
  const notification = useContext(NotificationContext)
  const navigate = useNavigate()
  return (
    <>
      {notification.flag && <Notification.Template />}
      <Template>
        {isMobile &&
          <MobileHeader className="pr-2">
            <Icon.Back onClick={() => navigate(-1)} className="fill-white w-8 mr-2" />
            <SearchBox />
          </MobileHeader>
        }
        <ProductContent />
      </Template>
    </>
  )
}

export default Product