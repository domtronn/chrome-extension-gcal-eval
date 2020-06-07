import React, { useEffect, useState } from "react"
import Loader from "react-spinners/GridLoader"

import blue from "@material-ui/core/colors/blue"

const TIMEOUT = 100

export default () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), TIMEOUT)
    return () => clearTimeout(timeout)
  }, [])

  if (!show) return null

  return (
    <div className="loader loader__container">
      <Loader size={22} color={blue[500]} loading />
    </div>
  )
}
