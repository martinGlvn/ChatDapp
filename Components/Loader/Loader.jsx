import React from 'react';
import Image from 'next/image';

// Internal Import
import Style from './Loader.module.css';
import images from '../../assets';

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.load} alt="loader" width={50} height={50}/>
      </div>
    </div>
  )
}

export default Loader