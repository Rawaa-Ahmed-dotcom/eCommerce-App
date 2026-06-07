import { useRouteError } from "react-router"

const FallbackError = () => {
    const error : unknown = useRouteError();
    console.log(error.message);
  return (
    <div>
      hh
    </div>
  )
}

export default FallbackError
