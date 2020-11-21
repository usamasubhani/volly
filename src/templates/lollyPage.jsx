import { navigate } from "gatsby"
import React from 'react'
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Lolly from '../components/lolly'

const GetLollyBySlugQuery = gql`
query GetLollyBySlug($slug: String!) {
    GetLollyBySlug(slug: $slug) {
      to
      message
      from
      flavourTop
      flavourMiddle
      flavourBottom
      slug
    }
  }`

const lollyPage = ({ location }) => {
    const { loading, error, data } = useQuery(GetLollyBySlugQuery, {
        variables: {
            slug: location.pathname.replace('/frozen/', ''),
        },
    });

    console.log(error)
    console.log(data)

    return (
        <div>
            <section>
                <Lolly
                    flavourTop={data?.GetLollyBySlug?.flavourTop}
                    flavourMiddle={data?.GetLollyBySlug?.flavourMiddle}
                    flavourBottom={data?.GetLollyBySlug?.flavourBottom}
                />
                <aside>
                    <div>
                        <h3>To: {data?.GetLollyBySlug?.to}</h3>
                        <h4>From: {data?.GetLollyBySlug?.from}</h4>
                        <p>Message: {data?.GetLollyBySlug?.message}</p>
                        <p> URL: <a href={location.origin + '/frozen/' + data?.GetLollyBySlug?.slug}>{location.origin}/frozen/{data?.GetLollyBySlug?.slug}</a></p>
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
