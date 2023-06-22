import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAd } from "../http/Services";
import Navbar from "../Components/Navbar";
import { GetAllAds, updateAd } from "../http/Services";
import CallIcon from "@mui/icons-material/Call";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "../http/axiosSet.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ProductDetails() {
  const [slides, setSlides] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [telephone, setTelephone] = useState();
  const [loaded, setLoaded] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log("product", product.telephone[0]);
  const { id } = useParams();
  useEffect(() => {
    const GetAd = async () => {
      try {
        const resp = await getAd(id);
        if (resp.status === "OK") {
          setProduct(resp.data);
          setImages(resp.data.images);
          setSlides(resp.data.images);
          setTelephone(resp.data.telephone[0]);
          setLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetAd();
  }, []);
  //////////////////////////////////////////////////////////////////
  const handlePress = async () => {
    try {
      handleOpen();
      const resp = await updateAd(product._id, { view: 1 });
      if (resp.status === "OK") {
        console.log("view updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////
  console.log("images", `${axios.defaults.baseURL}/upload/image/${images[0]}`);

  //////////////////////////////////////////////////////////////////
  const change = () => {
    if (activeSlide === slides.length - 1) {
      setActiveSlide(0);
    } else {
      setActiveSlide(activeSlide + 1);
    }
  };
  const changeback = () => {
    if (activeSlide === 0) {
      setActiveSlide(slides.length - 1);
    } else {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    loaded && (
      <div className="min-h-screen min-w-full flex flex-col   ">
        {/* write me a  */}
        <Navbar />
        <div className="flex justify-between w-[80%]  h-[300px] px-10 mobile:flex-col  relative ">
          <img
            src={`${axios.defaults.baseURL}/upload/image/${images[activeSlide]}`}
            className=" object-cover rounded-t-lg "
            crossOrigin="anonymous"
          />
          <div className="absolute top-[50%]" onClick={() => changeback()}>
            <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
          </div>
          <div className="absolute top-[50%] right-10" onClick={change}>
            <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
          </div>

          <div className="flex flex-col ml-8  w-full   ">
            <p className="font-medium text-2xl whitespace-nowrap ">
              Contact the announcer :
            </p>
            <p>
              <span className="font-normal text-2xl">Nom:</span>

              <span className="font-normal text-2xl mt-11 ">
                {product?.author?.name}
              </span>
            </p>
            <div
              className="flex flex-row justify-center items-center bg-[#007bff] text-[#FFF] rounded-[5px] font-Poppins font-medium text-[1.25rem] py-2 px-14 cursor-pointer mt-20 "
              onClick={() => handlePress()}
            >
              <CallIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
              Contact
            </div>
          </div>
        </div>
        <div className="flex ">
          <p className="font-medium text-4xl ml-10 mt-10">Prix :</p>
          <p className="font-medium text-4xl  mt-10">
            <span className="text-[#000] font-medium text-4xl">Rs</span>
            {product.price}
          </p>
          <p className="font-medium text-4xl ml-10 mt-10">Vues :</p>
          <p className="font-normal text-4xl  mt-10">
            {product.views}
            <span className="text-[#000]">Persons saw this</span>
          </p>
        </div>

        <div className="w-[80%]">
          <p className="font-medium text-5xl ml-10 mt-3">Titre :</p>
          <p className="text-2xl ml-10 mt-2 font-medium italic">
            {product.title}
          </p>
          <p className="font-medium text-5xl ml-10 mt-4">Nous offrons:</p>
          <p className="font-normal text-2xl ml-10 mt-10 text-start self-start">
            {product.description}
          </p>
          <div
            className="flex flex-row justify-center items-center bg-[#35B368] text-[#FFF] rounded-[5px] font-Poppins font-medium text-[1.25rem] py-2 px-14 cursor-pointer mt-20 ml-10 flex-grow-0 w-[20%] "
            onClick={() => handlePress()}
          >
            <CallIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
            Contact
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Here is your number
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {telephone}
            </Typography>
            <div
              className="flex flex-grow-0  bg-blue-700 w-24 py-2 justify-center items-center text-center text-white rounded-lg cursor-pointer"
              style={{ justifyContent: "center", alignItems: "center" }}
              onClick={() => handleClose()}
            >
              Close
            </div>
          </Box>
        </Modal>
      </div>
    )
  );
}

export default ProductDetails;
