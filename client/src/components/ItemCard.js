import dummyImage from '../img/cocacola.jpg'
import { Link } from "react-router-dom"

const ItemCard = ({ data: { _id, name, img_url, price, updatedAt } }) => {
  const date = new Date(updatedAt)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className='h-full w-1/2 md:w-1/3 lg:w-1/5 flex-wrap p-2'>
      <Link to={`product/${_id}`} className='block h-full w-full bg-slate-800 rounded-lg overflow-hidden hover:text-sky-500 text-slate-50'>
        <img src={dummyImage} alt="" className='w-full' />
        <div className='p-2 '>
          <p className=''>{name}</p>
          <p className='text-lg font-bold'>{`Rp${price}`}</p>
          <p className='text-sm text-slate-400 text-right'>{`Added ${hour}:${minute} ${monthList[month]} ${day}, ${year}`}</p>
        </div>
      </Link>
    </div>
  )
}

export default ItemCard