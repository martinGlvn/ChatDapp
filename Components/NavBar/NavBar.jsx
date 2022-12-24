import React, { useEffect, useState, useContext } from 'react'
import Image from "next/image";
import Link from "next/link";

import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model, Error } from "../index";
import Images from "../../assets";


// Style import
import Style from "./NavBar.module.css"


const NavBar = () => {
  const menuItems = [
    {
      menu : "All Users",
      link : "alluser",
    }
  ]
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}></div>
    </div>
  )
}

export default NavBar