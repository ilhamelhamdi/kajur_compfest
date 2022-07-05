import NavButton from './NavButton'
import Icon from '../img/index'

const NavBar = () => {
  return (
    <div className={`flex flex-row w-full`}>
      <NavButton name='Store' url="/">
        <Icon.Store className="w-10 h-10" />
      </NavButton>
      <NavButton name='Balance' url="/balance">
        <Icon.Balance className="w-10 h-10" />
      </NavButton>
      <NavButton name='Account' url="/account">
        <Icon.Account className="w-10 h-10" />
      </NavButton>
    </div>
  )
}

export default NavBar