import { useContext, useEffect } from "react"
import { NotificationContext } from "../context"
import Button from "./Button"

const Box = (props) => {
  const notification = useContext(NotificationContext)
  const close = () => {
    notification.setFlag(false)
  }
  return (
    <div className="fixed w-screen h-screen bg-slate-900/50 backdrop-blur-sm z-50 flex justify-center items-center" onClick={notification.isClosable ? close : () => { }}>
      <div onClick={e => e.stopPropagation()} className={`bg-slate-800 focus:bg-white container w-full mx-4 max-w-xl rounded-xl p-8 ${props.className}`} style={{ minHeight: '16rem' }} id="notif-box">
        {props.children}
      </div>
    </div>
  )
}

const Template = () => {
  const notification = useContext(NotificationContext)

  return (
    <Box className="flex flex-col justify-between text-center">
      <div className=" w-full text-sky-500 text-3xl">{notification.title}</div>
      <div className=" w-full text-white text-lg">{notification.message}</div>
      <div className="flex flex-row">
        {
          notification.actions.map(e => (
            <div className="flex-1 px-2" key={e.name}>
              <Button name={e.name} onClick={e.action} className="bg-slate-800 h-12 text-xl font-bold w-full" />
            </div>
          ))
        }
      </div>
    </Box>
  )
}

const Notification = { Box, Template }

export default Notification