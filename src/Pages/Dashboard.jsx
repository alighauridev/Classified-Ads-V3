import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import Footer from "../Components/Footer/Footer";
import { GetAllAds, getCategories, updateAd } from "../http/Services";
import CategoryDropdown from "../Components/CategoryDropDown";
import SearchBar from "../Components/SearchBar.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "../http/axiosSet.js";
const ProductComponent = ({ product }) => {
  console.log("product", product);
  const navigate = useNavigate();
  // const [selected, setSelected] = useState([]);
  // console.log("product", product._id);
  const handlePress = async () => {
    try {
      const resp = await updateAd(product._id, { view: 1 });
      if (resp.status === "OK") {
        console.log("view updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div
          className="flex flex-row w-[100%] lg:w-[75%] mobile:w-[100%] min-w-[180px]  mr-5 relative  my-4 overflow-hidden  "
          onClick={() => navigate(`/ProductDetails/${product._id}`)}
        >
          <img
            src={`${axios.defaults.baseURL}/upload/image/${product.images[0]}`}
            className=" h-[250px]  min-w-[36%] max-w-[36%]  rounded-l-2xl md:object-cover md:flex hidden object-cover "
            crossorigin="anonymous"
          />

          {/* <div className="bg-white w-full py-2  absolute top-[55.8%] rounded-t-3xl "></div> */}

          <div className="bg-white w-full p-5  h-[250px]  mobile:rounded-lg  md:rounded-r-lg flex flex-col justify-between border-2 ">
            <div className="flex justify-center items-center flex-col">
              <p className="font-Poppins font-semibold text-[2.25rem] text-[#2F2F2F]">
                {product.title}
              </p>
              <p className="font-Poppins font-medium text-[1.8rem] text-[#2f2f2f] ">
                <span className="font-bold">Category :</span>{" "}
                {product.category[0]} /{product.subCategory}
              </p>
              <p className="font-Poppins font-medium text-[1.3rem] text-[#2f2f2f] self-start ">
                <span className="font-bold"> Description:</span>
              </p>
              <p className="font-Poppins font-medium text-[1.25rem] text-[#2F2F2F] self-start">
                {product.description}
              </p>

              {/* make add buttun bg green */}
            </div>
            <div className="flex justify-between">
              <p className="font-Poppins font-bold text-[1.25rem] text-[#2F2F2F]">
                <span className="font-bold text-[1.8rem]  ">Price:</span>
                {product.price} $
              </p>
              <p className="font-Poppins font-bold text-[1.25rem] text-[#2F2F2F] ml-5">
                <span className="font-bold text-[1.8rem] mr-2 "> author</span>
                {product.author.name}
              </p>
              <p className="font-Poppins font-bold text-[1.25rem] text-[#2F2F2F] ml-5">
                <span className="font-bold text-[1.8rem] mr-2 ">
                  {" "}
                  Location:
                </span>
                {product.Location}
              </p>
              <div
                className="flex flex-row justify-center items-center bg-[#35B368] text-[#FFF] rounded-[5px] font-Poppins font-medium text-[1.25rem] py-2 px-14 mobile:hidden cursor-pointer "
                onClick={() => handlePress()}
              >
                <CallIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                Contact
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  console.log(`${axios.defaults.baseURL}/upload/image/`);
  //====================================================================
  const getProductsData = (state, filter) => {
    let products = state;
    if (filter.category && filter.category.length > 0) {
      console.log("filter", filter);
      products = products.filter((product) =>
        filter.category.some((cat) => product.category.includes(cat))
      );
    }
    if (filter.search) {
      products = products.filter((product) =>
        product.title.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    return products;
  };
  //====================================================================
  const [products, setProducts] = useState([]);
  //selected category
  const [selectedCategory, setSelectedCategory] = useState("");
  //list of categories
  const [categories, setCategories] = useState([]);
  //clenup useEffect try catch
  const [search, setsearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [page, setPage] = useState(1);
  const [callIt, setCallIt] = useState(false);
  const [pageCount, setCount] = useState();
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const resp = await GetAllAds(
          selectedCat !== "" && { category: { $in: selectedCat } },
          page //include selected categories
        );
        if (resp.status === "OK") {
          setProducts(resp.data);
          let setpage = Math.ceil(resp.count / 10);
          setCount(setpage);
        }

        // setProducts(resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, [selectedCat, page, callIt]);

  // For storing Slected Categories in useState array which categories are selected
  const handleTagClicked = (category) => {
    let index = selectedCat.indexOf(category);
    let temp = [];
    if (index !== -1) {
      return;
    } else if (category === "Other Services") {
      temp = [];
      setSelectedCat("");
      setCallIt(!callIt);
    } else {
      temp = [category];
    }
    setSelectedCat(temp);
  };
  // ====================================================================
  const displayProducts = getProductsData(products, {
    category: selectedCat,
    search: search.length > 0 ? search : null,
  });
  //==============================================================
  useEffect(() => {
    //fetch categories
    const fetchCategories = async () => {
      try {
        const resp = await getCategories();
        if (resp.status === "OK") {
          setCategories(resp.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="min-h-screen min-w-full flex flex-col">
      {/* write me a  */}
      <Navbar />
      <div className="flex-1">
        <div className="flex  px-10">
          <SearchBar setName={setsearch} />
          <CategoryDropdown
            categories={categories}
            onSelect={handleTagClicked}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 8fr" }}>
          <div style={{ marginTop: "40px" }}>{/* <MegaMenu/> */}</div>
          <div className="flex flex-col border-[#2F2F2F17]  px-10 my-14 flex-wrap justify-center items-center  ">
            {displayProducts
              .slice(0)
              .reverse()
              .map((product) => (
                <ProductComponent product={product} />
              ))}
          </div>
        </div>
        <div className="w-full items-center justify-center my-8 ">
          <Pagination
            count={pageCount}
            color="primary"
            size="large"
            boundaryCount={10}
            sx={{ display: "flex", justifyContent: "center" }}
            onChange={(e, page) => setPage(page)}
          />
        </div>
      </div>

      <div className=" ">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
