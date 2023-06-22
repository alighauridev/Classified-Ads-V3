import React from "react";
import "./Blog.scss";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../..//http/axiosSet.js";
const Blog = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="blog-parent">
      <div className="text-6xl mt-5">
        <h1> Some ads </h1>
      </div>
      <div className="card-grid">
        {products.map((item) => {
          return (
            <div
              className="card border-2 rounded-2xl"
              onClick={() => navigate(`/ProductDetails/${item._id}`)}
            >
              <img
                className="card-img-top rounded-t-xl"
                src={`${axios.defaults.baseURL}/upload/image/${item.images[0]}`}
                alt="Card image cap"
                crossorigin="anonymous"
              />
              <div className="card-body border-1">
                <h5 className="text-2xl my-4"> {item.title} </h5>
                <p className="text-xl my-2">{item.description}</p>
                <Link to="" className="link">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ml-28 mt-8 text-4xl">
        <Link to="/Dashboard" className="link">
          More ...
        </Link>
      </div>
    </div>
  );
};

export default Blog;
