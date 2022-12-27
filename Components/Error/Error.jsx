import React from 'react'

// Internal Import 
import Style from './Error.module.css'


const Error = ({error}) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please Fix this Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  )
}

export default Error