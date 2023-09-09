import React from 'react'
import {FC} from 'react';

interface pageProps {
  params:{test:string}
}

const page = ({params}) => {
  return (
    <div> test details {params.test}</div>
  )
}

export default page