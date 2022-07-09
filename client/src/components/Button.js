const Button = (props) => (
  <button
    className={`group bg-slate-900 hover:bg-sky-500 border-4 border-solid border-sky-500 rounded-lg text-sky-500 hover:text-slate-900 transition ${props.className}`} onClick={props.onClick}>
    {props.name}
  </button>
)

export default Button