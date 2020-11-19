import { navigate } from "gatsby"
import React from "react"
import Lolly from '../components/lolly'

export default function Home() {
  return (
    <div>
      <header>
        <section>
          <aside>
            <Lolly
              flavourTop="blue"
              flavourMiddle="black"
              flavourBottom="black"
            />
          </aside>
          <aside>
            <Lolly
              flavourTop="black"
              flavourMiddle="blue"
              flavourBottom="black"
            />
          </aside>
          <aside>
            <Lolly
              flavourTop="black"
              flavourMiddle="black"
              flavourBottom="blue"
            />
          </aside>
        </section>

        <button onClick={() => {
          navigate("/createlolly")
        }}>Create</button>
      </header>
    </div>
  )
}
