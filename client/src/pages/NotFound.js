import Icon from "../img"
import Template from "./Template"

const NotFound = () => {
  return (
    <Template>
      <div className="container xl:max-w-screen-xl mx-auto flex flex-col justify-center font-mono text-center mt-20 px-4 lg:mt-0">
        <div className=" text-sky-500 text-8xl  font-bold">Not Found</div>
        <div className="text-white text-3xl font-bold mb-8">It looks like you got lost in space!</div>
        <Icon.NotFound className="h-96" />
      </div>
    </Template>
  )
}

export default NotFound