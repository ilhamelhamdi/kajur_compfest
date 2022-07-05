/* eslint-disable react/jsx-pascal-case */
import _Template from "./_Template"
import dummyImage from '../img/cocacola.jpg'
import { IsMobileContext } from "../context"
import { useContext } from "react"
import MobileNavBar from "../components/MobileNavBar"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const ProductContent = () => {
  const [item, setItem] = useState({})
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    callAPI(id)
  }, [id])

  const callAPI = (id) => {
    fetch(`http://localhost:9000/items/${id}`)
      .then(res => res.json())
      .then(res => {
        setIsLoaded(true)
        setItem(res.body)
        console.log(id);
      })
      .catch(err => {
        setIsLoaded(true)
        setError(err)
      })
  }

  if (error) {
    return <div className='w-screen min-h-screen'>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div className='w-screen min-h-screen'>
      <p className='container mx-auto min-h-screen text-6xl text-white text-center align-middle'>Loading...</p>
    </div>
  } else {
    return (
      <div className="flex flex-col lg:flex-row max-w-xl lg:max-w-full mx-auto">
        <div className="lg:w-2/5">
          <img src={dummyImage} alt="" className="w-full rounded-xl max-h-full" />
        </div>
        <div className=" lg:w-3/5 h-full text-white lg:pl-12 flex flex-col px-4">
          <p className="text-5xl mb-4">{item.name}</p>
          <p className="text-6xl pb-4 mb-4 font-bold border-b-2 border-solid border-slate-500 text-sky-500">Rp{item.price}</p>
          <p className="text-2xl text-sky-500">Description</p>
          <p className="mb-8">{item.desc}</p>
          <Link to={`../balance/?price=${item.price}`}>
            <div className="bg-slate-900 hover:bg-sky-500 border-4 border-solid border-sky-500 rounded-lg h-16 text-sky-500 hover:text-slate-900 text-3xl font-bold text-center pt-2">Buy</div>
          </Link>
        </div>
      </div>
    )
  }
}

const ProductDesktopLayout = () => (
  <_Template>
    <div className="w-screen box-border container xl:max-w-screen-xl mx-auto pt-4">
      <ProductContent />
    </div>
  </_Template>
)

const ProductMobileLayout = () => (
  <div className='bg-slate-900 w-full min-h-screen overflow-x-hidden pb-24 scroll-smooth box-border'>
    <ProductContent />
    <MobileNavBar />
  </div>
)

const Product = () => {
  const isMobile = useContext(IsMobileContext)
  return isMobile ? <ProductMobileLayout /> : <ProductDesktopLayout />
}

export default Product