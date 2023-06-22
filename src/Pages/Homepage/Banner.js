import React from "react";

const Banner = () => {
  return (
    <div className="flex flex-col  justify-center px-16 md:flex-row bg-[#212529] ">
      <p className=" font-medium text-[white] text-[22px] pt-32 px-10  ">
        Discover the best deals in Africa with our free classified ads website!
        From cars to homes and mobiles, we've got you covered. Browse through
        our extensive listings and find your dream vehicle, ideal home, or the
        latest mobile device, all at no cost. Sell your items hassle-free and
        connect with a vast network of potential buyers across the continent.
        Start exploring Africa Classifieds today and unlock a world of
        possibilities!
      </p>
      <img
        src={"https://oxa.al/wp-content/uploads/2022/03/development.svg"}
        alt=""
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default Banner;
