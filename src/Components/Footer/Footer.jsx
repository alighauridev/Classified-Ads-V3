import { Link } from "react-router-dom";
import React from "react";

const socialStyle =
  "m-3 rounded-full cursor-pointer p-2 text-white px-5 text-[20px] ";

function Footer() {
  return (
    <div className="flex flex-row items-center justify-between p-2 mobile:flex-col mobile:items-start bg-[#304146] text-white mobile:hidden  ">
      <div className="flex-1 flex flex-col flex-wrap p-2 ">
        {/* {store info} */}
        <h1 className="text-[25px] font-bold ">Jiji</h1>
        <p className="text-[20px]">
          Discover the best deals in Africa with our free classified ads
          website! From cars to homes and mobiles, we've got you covered. Browse
          through our extensive listings and find your dream vehicle, ideal
          home, or the latest mobile device, all at no cost. Sell your items
          hassle-free and connect with a vast network of potential buyers across
          the continent. Start exploring Africa Classifieds today and unlock a
          world of possibilities!
        </p>
        <div className="flex item-center justify-center mt-3 self-start">
          <a
            href="https://www.facebook.com/abdullah.ali132"
            className={`${socialStyle} bg-blue-700`}
          >
            <i className="fa fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/sh_abdullah_mumtaz/"
            className={`${socialStyle} bg-red-800`}
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://github.com/Abdullah-146"
            className={`${socialStyle} bg-black`}
          >
            <i className="fa fa-github"></i>
          </a>
          <a
            href="https://twitter.com/ShAbdullah65"
            className={`${socialStyle} bg-sky-400`}
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            href="https://wa.me/+923485517655"
            className={`${socialStyle} bg-green-600`}
          >
            <i className="fa fa-whatsapp"></i>
          </a>
        </div>
      </div>
      <div className=" flex flex-col p-2 text-2xl">
        <div className="flex m-3">
          <i className="fa fa-map-marker-alt"></i>
          <p className="pl-3">State of Pakistan</p>
        </div>
        <div className="flex m-3">
          <i className="fa fa-phone-alt"></i>
          <p className="pl-3">+923485517655</p>
        </div>
        <div className="flex m-3 items-center">
          <i className="fa fa-envelope"></i>
          <p className="pl-3">Abdullah.mumtaz65@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
