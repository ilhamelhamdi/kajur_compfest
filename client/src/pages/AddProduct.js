import { useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { IsMobileContext, NotificationContext } from "../context"
import Template from "./Template"
import Icon from "../img/index"
import Button from "../components/Button"
import ImageUtils from "../utils/ImageUtils"
import APIUtils from '../utils/APIUtils';
import { API_IMAGE_SERVER_URL, API_URL } from "../config"
import Notification from "../components/Notification"
import NotifUtils from "../utils/NotifUtils"
import MobileHeader from "../components/MobileHeader"

const iconLoading = <Icon.Loading className="animate-spin h-5 w-5 mr-3 text-sky-500 group-hover:text-white inline-block" />


const AddProductContent = () => {
  const MAX_NAME_CHAR = 70
  const MAX_DESC_CHAR = 1000
  const [productImg, setProductImg] = useState('')
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productDesc, setProductDesc] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notification = useContext(NotificationContext)
  const [cookies, setCookies] = useCookies()

  const navigate = useNavigate()

  const changeImage = (e) => {
    setProductImg(e.target.files[0])
  }
  const changeProductName = (e) => {
    let value = e.target.value
    if (value.length > MAX_NAME_CHAR) {
      value = value.slice(0, MAX_NAME_CHAR)
    }
    setProductName(value)
  }

  const changeProductPrice = (e) => {
    if (e.target.value >= 0) setProductPrice(e.target.value)
  }

  const changeProductDesc = (e) => {
    let value = e.target.value
    if (value.length > MAX_DESC_CHAR) {
      value = value.slice(0, MAX_DESC_CHAR)
    }
    setProductDesc(value)
  }

  const submitData = async () => {
    // Check Data
    try {
      setIsLoading(true)
      const uploadedImg = await ImageUtils.uploadImg(API_IMAGE_SERVER_URL, productImg)
      const productDescArray = productDesc.split('\n')
      const data = {
        name: productName,
        price: productPrice,
        desc: productDescArray,
        img: {
          url: uploadedImg.data.link,
          delete_url: API_IMAGE_SERVER_URL + '/' + uploadedImg.data.deletehash
        }
      }

      const resultAPI = await APIUtils.post(`${API_URL}/items`, data, cookies.token)

      // Popping Up Success Notification
      const isSuccess = (uploadedImg.success && (resultAPI.status === 'success'))
      if (isSuccess) {
        setIsLoading(false)
        navigate(`../product/${resultAPI.body._id}`)
        notification.setMessage('Your product has been uploaded successfully!')
        notification.setActions([{
          name: 'OK',
          action: () => {
            notification.setFlag(false)
          }
        }])
        notification.setFlag(true)
      }

    } catch (e) {
      console.log(e.message);
    }
  }

  const preventInvalidPrice = (e) => {
    const invalidChars = ['-', '+', 'e', '.']
    if (invalidChars.includes(e.key)) e.preventDefault()
  }

  const normalizeInputPrice = (e) => {
    let normalized = Number.parseInt(e.target.value) || 0
    setProductPrice(normalized)
    document.getElementById('product-price').value = normalized
  }

  return (
    <div className="container xl:max-w-screen-xl flex flex-col lg:flex-row mx-auto text-white pt-20 lg:pt-0">
      {/* Image Preview */}
      <div className="lg:w-2/5 mb-4 px-4">
        <div className="mb-1"><span className="font-bold">Image</span></div>
        <div className="w-full rounded-xl bg-slate-800 relative fill-white hover:fill-sky-500 hover:outline outline-sky-500 overflow-hidden mb-2" style={{ paddingTop: '100%' }}>
          <input type="file" onChange={changeImage} name="product-image" id="product-image" className="w-full h-full cursor-pointer opacity-0 z-50 absolute bottom-0" />
          {
            productImg ?
              <img src={URL.createObjectURL(productImg)} alt="" className="w-full absolute inset-0" /> :
              <div className="absolute inset-0 flex justify-center items-center h-full">
                <Icon.AddImage className="w-48 h-48 block" />
              </div>
          }
        </div>
        <div className="w-full text-xs text-sky-500">
          <p className="">Tips : Image format .jpg .jpeg .png and minimum size 300 x 300px (ratio 1:1)</p>
        </div>
      </div>

      {/* Right Side */}
      <div className=" lg:w-3/5 h-full lg:pl-12 flex flex-col px-4 ">

        {/* Product Name */}
        <div className="mb-4">
          <div className="mb-1"><span className="font-bold">Product Name</span></div>
          <input type="text" value={productName} onChange={changeProductName} id="product-name" className="rounded-lg bg-slate-800 block w-full py-2 px-4 outline-none focus:outline-sky-500" placeholder="Product name" />
          <div className="w-full flex flex-row justify-between text-xs text-sky-500">
            <span className="inline-block w-4/5">Tips :  (Product Type + Brand + Additional Information)</span>
            <span className="inline-block">{productName.length}/{MAX_NAME_CHAR}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="mb-1">
            <span className="font-bold">Price</span>
          </div>
          <div className="rounded-lg bg-slate-800 flex flex-row overflow-hidden focus-within:outline outline-2 outline-sky-500">
            <div className="w-12 inline-block border-r-2 border-solid border-slate-900"><span className="block h-full w-full text-center leading-10">Rp</span></div>
            <input type="number" value={productPrice} min={0} onWheel={e => { e.target.blur() }} onKeyDown={preventInvalidPrice} onChange={changeProductPrice} onBlur={normalizeInputPrice} id="product-price" className="bg-slate-800 inline-block py-2 px-4 flex-1 outline-none focus:outline-sky-500" placeholder="Price" />
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <div className="mb-1">
            <span className="font-bold">Description</span>
          </div>
          <textarea id="product-desc" className="rounded-lg bg-slate-800 w-full h-52 xl:h-72 py-2 px-4 mb-2 resize-none outline-none  focus:outline-sky-500" placeholder={productDesc} onChange={changeProductDesc} value={productDesc}></textarea>
          <div className="w-full flex flex-row justify-between text-xs text-sky-500">
            <span className="inline-block w-4/5">Tips :  Make sure the product description contains a detailed explanation of your product</span>
            <span className="inline-block">{productDesc.length}/{MAX_DESC_CHAR}</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button className='h-12 text-2xl font-bold' name={
          isLoading ?
            <span>{iconLoading} Loading...</span> :
            'Submit'
        } onClick={
          isLoading ?
            () => { } :
            submitData
        } />

      </div>
    </div>
  )
}

const AddProduct = () => {
  const isMobile = useContext(IsMobileContext)
  const notification = useContext(NotificationContext)
  const [cookies, setCookies] = useCookies()
  const navigate = useNavigate()

  useEffect(() => {
    if (cookies.isLogged !== '1') NotifUtils.loginPrompt(notification, navigate)
  }, [cookies.isLogged])

  return (
    <>
      {notification.flag && <Notification.Template />}
      <Template>
        {isMobile &&
          <MobileHeader>
            <Icon.Back onClick={() => navigate(-1)} className="fill-white w-8 ml-2" />
            <div className="text-2xl text-white w-full text-center">Add Product</div>
          </MobileHeader>
        }
        <AddProductContent />
      </Template>
    </>
  )
}

export default AddProduct