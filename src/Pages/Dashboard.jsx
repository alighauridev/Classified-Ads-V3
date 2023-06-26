import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import EditIcon from "@mui/icons-material/Edit";
import CallIcon from "@mui/icons-material/Call";
import Footer from "../Components/Footer/Footer";
import './Dashboard.scss'
import { GetAllAds, getCategories, updateAd } from "../http/Services";
import CategoryDropdown from "../Components/CategoryDropDown";
import SearchBar from "../Components/SearchBar.js";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import axios from "../http/axiosSet.js";
import MegaMenu from "./Megamenu/MegaMenu";
import img from '../assets/Tabpanel ⏵ Link.png'
import { Link } from "react-router-dom";
import Pakage from "../Components/Pakage/Pakage";
import AdminDashboard from "../Components/AdminDashboard";
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

      <div className="card-grid" style={{borderRadius:'4px',boxShadow: '0px 1px 2px rgba(96, 125, 135, 0.15)',height:'235px'}}>
      {/* onClick={() => navigate(`/ProductDetails/${product._id}`)} */}
        <div className="card-parent"
         style={{margin:'10px 0',position:'relative',borderRadius:'4px'}}
        >
          <img
            src={`${axios.defaults.baseURL}/upload/image/${product.images[0]}`}
           
            
            crossorigin="anonymous" style={{borderRadius:'4px',height:'145px'}}
          />

          {/* <div className="bg-white w-full py-2  absolute top-[55.8%] rounded-t-3xl "></div> */}

          <div style={{padding:'25px 10px 10px 10px'}}>
            <div >
              <p style={{fontSize:'18px',fontWeight:'600'}}>
                {product.title}
              </p>
             
              {/* <p >
                <span className="font-bold">Category :</span> {product.category[0]}{" "}
                /{product.subCategory}
              </p>
              <p >
                <span className="font-bold"> Description:</span>
              </p>
              <p >
                {product.description}
              </p> */}

              {/* make add buttun bg green */}
            </div>
            <div >
              <p style={{fontSize:'15px',fontWeight:'400',color:'#00B53F',fontWeight:'500'}}>
                <span style={{color:'#00B53F'}}>Price:</span>
                {product.price} $
              </p>
              {/* <p >
                <span > author</span>
                {product.author.name}
              </p>
              <p >
                <span> Location:</span>
                {product.Location}
              </p> */}
              {/* <div
               
                onClick={() => handlePress()}
              >
                <CallIcon sx={{ color: "#FFF", width: 18, height: 18 }} />
                Contact
              </div> */}
            </div>
            <div style={{position:'absolute',top:'130px',right:'20px'}}>
                <img src="./images/button.png" alt="" />
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
    <div className="min-h-screen min-w-full flex flex-col" style={{ background: '#EBF2F7' }}>
      {/* write me a  */}
      <Navbar />
      <div className="flex-1">
        {/* <div className="flex  px-10">
          <SearchBar setName={setsearch} />
          <CategoryDropdown
            categories={categories}
            onSelect={handleTagClicked}
          />
        </div> */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 8fr', padding: '20px 20px', gap: '10px',width:'90%',margin:'auto' }}>

          {/* MEGAMENU SECTION */}

          <div>
            <MegaMenu />
          </div>




          <div>
            {/* BANNER SECTION */}
            <div style={{}}>
         <div>
         <img src={img} alt="" style={{ width: '100%', }} />
         </div>
         {/* <div>
          <img src="./images/add.png" alt=""nstyle={{ width: '100%', }}  />
         </div> */}
            </div>

            {/* ADS SECTION */}

        


            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:'10px',margin:'20px 0'}} >
              {displayProducts
                .slice(0)
                .reverse()
                .map((product) => (
                  <Link to='/secondpage'>
                    <ProductComponent product={product} />
                  </Link>
                ))}
            </div>


            
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
<div>

</div>
      <div className=" ">
      <Footer />
      </div>
    
    </div>
  );
}

export default Dashboard;
