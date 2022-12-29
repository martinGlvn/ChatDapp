import React, { useEffect, useState, useContext } from 'react'
import Image from "next/image";
import Link from "next/link";

import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets";


// Style import
import Style from "./NavBar.module.css"


const NavBar = () => {
  const menuItems = [
    {
      menu : "All Users",
      link : "alluser",
    },
    {
      menu : "CHAT",
      link : "/",
    },
    {
      menu : "CONTACT",
      link : "/",
    },
    {
      menu : "SETTING",
      link : "/",
    },
    {
      menu : "FAQS",
      link : "/",
    },
    {
      menu : "TEMS OF USE",
      link : "/",
    }
  ]
  // Use State
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(ChatAppContext);

  return (

    <div className={Style.NavBar}>


      <div className={Style.NavBar_box}>

        <div className={Style.NavBar_box_left}>
          <Image src={images.logo}  alt="logo" width={50} height={50}/>
        </div>

        <div className={Style.NavBar_box_right}>
        
          {/* Desktop */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i)=>(
              <div 
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={ `${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }}`}
                >
                <Link className={Style.NavBar_box_right_menu_items_link}
                href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          
          {/* Mobile */}
          {open && (
            <div className={Style.mobile_menu}>
            {menuItems.map((el, i)=>(
              <div 
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={ `${Style.mobilemenu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
                >
                <Link className={Style.mobilemenu_items_link}
                href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
            <p className={Style.mobile_menu_btn}>
              <Image
                src={images.cancel}
                alt="close"
                width={50}
                height={50}
                onClick={()=>setOpen(false)}
              />
            </p>
            </div>
          )}

          {/* Connect Wallet */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? ( 
              <button onClick={()=> connectWallet()}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={()=> setOpenModel(true)}>
                {""}
                <Image src={userName ? images.accountName : images.create2}
                  alt="Account Image"
                  width={20}
                  height={20}
                />   
                {''}
                <small>{userName || "Create Account "}</small>
              </button>
            )}
          </div>

          <div
            className={Style.NavBar_box_right_open}
            onClick={()=>setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30}/>
          </div>


        </div>

      </div>
      
      {/* Model Component */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model 
            openBox={setOpenModel}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Natus quaerat quos non commodi nobis consequuntur provident,
                  omnis dicta, dolor, repudiandae ipsum quam velit consequatur
                  tenetur labore laboriosam aspernatur alias accusamus."
            smallInfo="Kindley select your name..."
            image={images.hero}
            functionName={createAccount}
            address={account}
          />
          
        </div>
      )}
        {error == "" ? "" : <Error error={error} />}
    </div>

  );
};

export default NavBar