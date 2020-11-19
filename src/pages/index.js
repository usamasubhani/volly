import { navigate } from "gatsby"
import React from "react"
import Lolly from '../components/lolly'
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
        <h1>Volly</h1>
        <p>Send virtual lolly to someone</p>
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

        <p>
          <a href="#" onClick={() => {
            navigate("/createlolly")
          }}>
            <i>Create</i>
          </a>
        </p>
      </header>
    </div>
  )
}
