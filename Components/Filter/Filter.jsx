import React, { useState, useContext, use } from 'react';
import Image from 'next/image';

// Internal Import
import Style from './Filter.module.css';
import images from '../../assets';
import {ChatAppContext} from '../../Context/ChatAppContext';
import { Model } from '../index'

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  // const {} = useContext(ChatAppContext);

  //useState
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>

      <div className={Style.Filter_box}>

        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20}/>
            <input type="text" placeholder="search.."/>
          </div>
        </div>

        <div className={Style.Filter_box_right}>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20}/>
            ADD FRIEND
          </button>
        </div>

      </div>

      {/* Model Component */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="Welcome to"
            head="Chat Buddy"
            info="Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Recusandae, tempora. Sequi ex aliquam, non distinctio,
                  pariatur, at deleniti quidem ut explicabo veritatis asperiores
                  repellendus eius error. Aliquid eum numquam nesciunt."
            smallInfo="Kindley Select Your Friend Name & Address.."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}

    </div>
  )
}

export default Filter