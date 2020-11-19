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
    }
  }`

const Frozen = ({location}) => {
    const { loading, error, data } = useQuery(GetLollyBySlugQuery, {
        variables: {
            slug: location.pathname.replace('/frozen/', ''),
        },
    });

    console.log(error)
    console.log(data)

    return (
        <div>
            <Lolly
                flavourTop={data?.GetLollyBySlug?.flavourTop}
                flavourMiddle={data?.GetLollyBySlug?.flavourMiddle}
                flavourBottom={data?.GetLollyBySlug?.flavourBottom}
            />
            <div>
                <p>To: {data?.GetLollyBySlug?.to}</p>
                <p>From: {data?.GetLollyBySlug?.from}</p>
                <p>Message: {data?.GetLollyBySlug?.message}</p>
            </div>
        </div>
    )
}

export default Frozen
