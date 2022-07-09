import Icon from "../img";

const iconLoading = <Icon.Loading className="animate-spin h-5 w-5 mr-3 text-sky-500 group-hover:text-white inline-block" />

const onLoadingAction = (ctx) => {
  ctx.setActions([{
    name: <span>{iconLoading} Loading...</span>,
    action: () => { }
  }])
  ctx.setIsClosable(false)
}

const onSuccessAction = (ctx, msg) => {
  ctx.setIsClosable(true)
  ctx.setTitle('Success')
  ctx.setMessage(msg)
  ctx.setActions([{
    name: 'OK',
    action: () => ctx.setFlag(false)
  }])
  ctx.setFlag(true)
}

const loginPrompt = (ctx, navigate) => {

  ctx.setTitle("Ooops!!!")
  ctx.setMessage("You have to login first!")
  ctx.setActions([
    {
      name: 'Login',
      action: () => {
        ctx.setIsClosable(true)
        navigate('/login')
        ctx.setFlag(false)
      }
    },
    {
      name: 'Register',
      action: () => {
        ctx.setIsClosable(true)
        navigate('/register')
        ctx.setFlag(false)
      }
    }
  ])
  ctx.setIsClosable(false)
  ctx.setFlag(true)
}

const NotifUtils = { onLoadingAction, onSuccessAction, loginPrompt }
export default NotifUtils