import { navigate, graphql } from "gatsby"
import React from 'react'
import Lolly from '../components/lolly'

export const query = graphql`
    query($slug: String!) {
        Vollies {
            GetLollyBySlug(slug: $slug) {
                to
                message
                from
                flavourTop
                flavourMiddle
                flavourBottom
                slug
              }
        }
    }
`

const lollyPage = ({ data ,location}) => {

    console.log(data)

    return (
        <div>
            <section>
                <Lolly
                    flavourTop={data?.Vollies?.GetLollyBySlug?.flavourTop}
                    flavourMiddle={data?.Vollies?.GetLollyBySlug?.flavourMiddle}
                    flavourBottom={data?.Vollies?.GetLollyBySlug?.flavourBottom}
                />
                <aside>
                    <div>
                        <h3>To: {data?.Vollies?.GetLollyBySlug?.to}</h3>
                        <h4>From: {data?.Vollies?.GetLollyBySlug?.from}</h4>
                        <p>Message: {data?.Vollies?.GetLollyBySlug?.message}</p>
                        <p> URL: <a href={location.origin + '/frozen/' + data?.Vollies?.GetLollyBySlug?.slug}>{location.origin}/frozen/{data?.Vollies?.GetLollyBySlug?.slug}</a></p>
                    </div>

                    <p>
          <a href="#" onClick={() => {
            navigate("/createlolly")
          }}>
            <i>Create a Volly</i>
          </a>
        </p>
                </aside>
            </section>
        </div>
    )
}

export default lollyPage
