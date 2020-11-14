import React from "react"
import Lolly from '../components/lolly'

export default function Home() {
  return (
    <div>
      <Lolly
          flavourTop="black"
          flavourMiddle="pink"
          flavourBottom="black"
        />

        <button>Create</button>
    </div>
  )
}
