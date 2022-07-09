import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Template from "./Template"
import APIUtils from "../utils/APIUtils"
import { API_URL } from "../config"
import Icon from "../img"
import { NotificationContext } from "../context"
import Notification from "../components/Notification"

const Register = () => {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const notification = useContext(NotificationContext)
  const navigate = useNavigate()

  const iconLoading = <Icon.Loading className="animate-spin h-5 w-5 mr-3 text-sky-500 group-hover:text-white inline-block" />

  const onRegister = async () => {
    const requestBody = {
      userId,
      password,
      name: userName
    }

    try {
      setIsLoading(true)
      const res = await APIUtils.post(`${API_URL}/register`, requestBody)
      if (res.status === 'success') {
        navigate('/login', { replace: true })
      } else {
        notification.setTitle('Register Failed')
        notification.setMessage(res.message)
        notification.setActions([{
          name: 'OK',
          action: () => notification.setFlag(false)
        }])
        notification.setFlag(true)
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      {notification.flag && <Notification.Template />}
      <Template>
        <div className="fixed inset-0 w-screen h-screen flex justify-center items-center">
          <div className="w-screen max-w-xl h-fit p-8 bg-slate-800/50 rounded-3xl text-white mx-4 lg:mx-0">
            <div className="text-3xl text-center font-semibold mb-4">Member Registration</div>
            <div className="space-y-4 mb-4">
              {/* User Id */}
              <div className="rounded-lg bg-slate-800 flex flex-row overflow-hidden focus-within:outline outline-2 outline-sky-500">
                <div className="w-12 inline-block bg-slate-900">
                  <Icon.Id className="fill-white block m-auto h-full" />
                </div>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Student Id" className="bg-slate-800 inline-block py-2 px-4 flex-1 outline-none " />
              </div>

              {/* User Name */}
              <div className="rounded-lg bg-slate-800 flex flex-row overflow-hidden focus-within:outline outline-2 outline-sky-500">
                <div className="w-12 inline-block bg-slate-900">
                  <Icon.Account className="fill-white block m-auto w-8 h-full" />
                </div>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Full Name" className="bg-slate-800 inline-block py-2 px-4 flex-1 outline-none " />
              </div>

              {/* Password */}
              <div className="rounded-lg bg-slate-800 flex flex-row overflow-hidden focus-within:outline outline-2 outline-sky-500">
                <div className="w-12 inline-block bg-slate-900">
                  <Icon.Password className="fill-white block m-auto w-8 h-full" />
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="bg-slate-800 inline-block py-2 px-4 flex-1 outline-none " />
              </div>
            </div>
            <Button name={
              isLoading ? <span>{iconLoading} Loading...</span> : 'REGISTER'
            } className={`w-full text-xl font-bold h-12 border-2 bg-transparent mb-4 ${isLoading && 'cursor-not-allowed'}`} onClick={isLoading ? () => { } : onRegister} />
            <div className="text-right">
              <span>Already have an account? </span>
              <Link to={'../login'}>
                <span className="text-sky-500 hover:underline">LOG IN</span>
              </Link>
            </div>
          </div>
        </div>
      </Template>
    </>
  )
}

export default Register