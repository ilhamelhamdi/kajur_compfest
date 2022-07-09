import { Link } from "react-router-dom"
import EtcUtils from "../utils/EtcUtils"

const ItemCard = ({ data: { _id, name, img, price, updatedAt } }) => {
  const { day, year, hour, minute, month } = EtcUtils.parseDate(updatedAt)

  return (
    <div className='h-full w-1/2 md:w-1/3 lg:w-1/5 flex-wrap p-2'>
      <Link to={`product/${_id}`} className='block w-full bg-slate-800 rounded-lg overflow-hidden hover:text-sky-500 text-slate-50'>
        <div className="relative overflow-hidden" style={{ paddingTop: '100%' }}>
          <img src={img.url} alt="" className='w-full inset-0 absolute' />
        </div>
        <div className='p-2 '>
          <p className='h-12 line-clamp-2 mb-1'>{name}</p>
          <p className='text-lg font-bold mb-1'>{`Rp${price.toLocaleString('id-ID')}`}</p>
          <p className='text-sm text-slate-400 text-right'>{`Added ${hour}:${minute} ${month} ${day}, ${year}`}</p>
        </div>
      </Link>
    </div>
  )
}

const ItemCardSkeleton = () => (
  <div className='h-full w-1/2 md:w-1/3 lg:w-1/5 flex-wrap p-2'>
    <div className='block w-full bg-slate-800 rounded-lg overflow-hidden'>
      <div className="relative overflow-hidden bg-slate-700 animate-pulse" style={{ paddingTop: '100%' }}>
        <div className='w-full inset-0 absolute'></div>
      </div>
      <div className='p-2 pt-3 space-y-3 animate-pulse'>
        <div className="h-3 rounded-full bg-slate-700"></div>
        <div className="h-3 rounded-full bg-slate-700"></div>
        <div className="h-5 rounded-full bg-slate-700 w-1/2"></div>
        <div className="h-4 rounded-full  w-1/3 inline-block"></div>
        <div className="h-3 rounded-full bg-slate-700 w-2/3 inline-block"></div>
      </div>
    </div>
  </div>
)

export { ItemCard, ItemCardSkeleton }