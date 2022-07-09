import { Link } from "react-router-dom"

const NavButton = (props) => {
  return (
    <Link to={props.url} className='text-white fill-white text-center lg:text-left p-2 flex flex-col lg:flex-row content-center w-1/3 hover:text-sky-500 hover:fill-sky-500'>
      <div className="lg:w-1/3 flex-1 flex justify-center">
        {props.children}
      </div>
      {/* <img src={props.img} alt="" className='h-12 lg:h-10' /> */}
      <span className="inline-block text-lg ml-2 lg:leading-10 flex-1 ">{props.name}</span>
    </Link>
  )
}

export default NavButton