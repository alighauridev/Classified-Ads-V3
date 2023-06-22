import React, { useEffect } from "react";
import Banner from "./Banner";
import Blog from "./Blog";
import { GetAllAds } from "../../http/Services";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer/Footer";

const Homescreen = () => {
  const [products, setProducts] = React.useState([]);
  // console.log("home screen" + products[0]);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const resp = await GetAllAds(null, null, 3);
        if (resp.status === "OK") {
          setProducts(resp.data);
        }

        // setProducts(resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);
  return (
    <div>
      <Navbar />
      <Banner />
      <Blog products={products} />
      <Footer />
    </div>
  );
};

export default Homescreen;
