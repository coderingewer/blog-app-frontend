import React from 'react'

import load from "./load.gif"
import "./style.css"

function Loading() {
  return (
    <div>
        <img id = "loading" src={load} />
    </div>
  )
}

export default Loading