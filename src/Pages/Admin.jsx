import React, { useEffect, useState } from "react";
import style from "../loanrequest.module.css";

import data from "../Components/Userdata.js";
import { GetAllAds, GetAllAdsAdmin, updateAd } from "../http/Services";
import axios from "../http/axiosSet.js";

import { toast } from "react-toastify";
import Sidebar from "./Admin/components/sidebar";
function Admin() {
  //====================================================================
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    subCategories: [],
  });
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    localStorage.setItem("@accessToken", "");
    localStorage.setItem("@refreshToken", "");
    // localStorage.setItem("@userdetails", "");
    window.location.reload();
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const resp = await GetAllAdsAdmin();
        console.log(resp);
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
  console.log(search);
  //////////////////////////////////////////////////////////////////
  const handlePress = async (id, accept = false) => {
    try {
      const resp = await updateAd(id, {
        status: !accept ? "pending" : "accepted",
      });

      //   resp = await updateAd(id, { status: "pending" });

      if (resp.status === "OK") {
        console.log("view updated");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////////////////////////////////////////////////////

  const handleSubmitCategory = async () => {
    try {
      const resp = await axios.post("/category/createCategory", category);
      if (resp.data.status === "OK") {
        toast.success("Great!! Category added successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-[#1a294d]">
      <div>
        <Sidebar/>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <div className="flex justify-between flex-col ">
        <p
          className="text-white text-start text-5xl font-bold mt-10"
          style={{
            marginLeft: "10px",
            fontWeight: "bold",
            fontSize: "30px",
          }}
        >
          ajouter une catégorie
        </p>
        <div
          className="flex justify-between flex-row "
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
            }}
          >
            catégorie
          </div>

          <input
            type="text"
            className="border-2 border-gray-300 p-2 w-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Enter category"
            style={{ borderRadius: "8px" }}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <div
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              fontWeight: "600",
              fontSize: "20px",
              color: "white",
            }}
          >
            Sous-catégories
          </div>

          <input
            type="text"
            className="border-2 border-gray-300 p-2 w-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent   "
            style={{ borderRadius: "8px" }}
            placeholder="Sub Categories"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value !== "") {
                console.log("enter");

                return setCategory({
                  ...category,
                  subCategories: [...category.subCategories, e.target.value],
                });
              }
            }}
          />
        </div>
        <p
          style={{
            marginLeft: 10,
            fontWeight: "500",
            fontSize: 20,
            color: "white",
          }}
          className="mt-3"
        >
          <span style={{ fontWeight: "bold", color: "red" }}>Note:</span>
          Appuyez sur Entrée après avoir écrit chaque sous-catégorie pour
          l'ajouter et appuyez sur la balise pour la supprimer
        </p>
        <div className="flex flex-row" style={{ display: "flex" }}>
          {category.subCategories.map((item) => {
            return (
              <div
                className="bg-[#d3cfcf] text-[#2f2f2f]  font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2  ml-5"
                onClick={() => {
                  let index = category.subCategories.indexOf(item);
                  let arr = [...category.subCategories];
                  arr.splice(index, 1);
                  setCategory({ ...category, subCategories: arr });
                }}
                style={{
                  background: "#d3cfcf",
                  marginLeft: "10px",
                  marginRight: "10px",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
        {/* submit button */}
        <div>
          <button
            className="bg-[#2f2f2f] text-white  font-Poppins font-bold text-[1.2rem] rounded-[8px] px-4 py-2  ml-5"
            style={{
              background: "#2f2f2f",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "8px",
              padding: "10px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
            onClick={handleSubmitCategory}
          >
            Submit
          </button>
        </div>
      </div>
      <table>
        <caption className="bg-[#1a294d] font-semibold  ">Admin Pannel</caption>

        <thead
          className="bg-[#1a294d] font-semibold  flex-1 width-full "
          //   style={{ backgroundColor: "" }}
        >
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">status</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr>
                <td scope="row">{item.title}</td>
                <td>{item.author.email}</td>
                <td>{item.status}</td>
                <button
                  className={style.btn_cancel}
                  onClick={() => handlePress(item._id)}
                >
                  Pending
                </button>
                <button
                  className={style.btn_ok}
                  onClick={() => handlePress(item._id, true)}
                >
                  <a>Accepted</a>
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
