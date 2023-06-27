import React, { useEffect, useState } from "react";
import style from "../loanrequest.module.css";

import data from "../Components/Userdata.js";
import { GetAllAds, GetAllAdsAdmin, updateAd } from "../http/Services";
import axios from "../http/axiosSet.js";

import { toast } from "react-toastify";
import AdminDashboard from "../Components/AdminDashboard";

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
    <div className="h-screen bg-[#F5F5F5]">
      <div>
        <AdminDashboard handlePress={handlePress} products={products} />
      </div>
      <button onClick={handleLogout}>Logout</button>

      {/* <table>
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
      </table> */}
    </div>
  );
}

export default Admin;
