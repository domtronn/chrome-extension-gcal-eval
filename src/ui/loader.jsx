import React, { useEffect, useState } from "react"
import GridLoader from "react-spinners/GridLoader"

import red from "@material-ui/core/colors/red"

const TIMEOUT = 100

export default () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), TIMEOUT)
    return () => clearTimeout(timeout)
  }, [])

  if (!show) return null

  return (
    <div style={{ margin: "24px auto", width: "100%" }}>
      <GridLoader size={32} color={red[500]} loading />
    </div>
  )
}
