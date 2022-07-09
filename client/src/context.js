import React from "react"
const IsMobileContext = React.createContext(true)
const NotificationContext = React.createContext({
  flag: false,
  message: '',
  title: 'Notification',
  actions: [
    {
      name: '',
      action: ''
    }
  ],
  isClosable: true,
  setFlag: () => { },
  setMessage: () => { },
  setTitle: () => { },
  setActions: () => { },
  setIsClosable: () => { }
})
export { IsMobileContext, NotificationContext }