import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../Redux/actions/productActions";

const Product = ({ product }) => {
    const { name, description, _id, price } = product;
    const dispatch = useDispatch();
    const deleteHandler = (id) => {
        dispatch(deleteProduct(id));
        console.log('sd');
    };
    return (
        <>
            <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
                <div className="card card-product-grid shadow-sm">
                    <Link to="#" className="img-wrap">
                        <img src={product.image.url} alt="Product" />
                    </Link>{" "}
                    <div className="info-wrap">
                        <Link to="#" className="title text-truncate">
                            {" "}
                            {name}{" "}
                        </Link>{" "}
                        <div className="price mb-2">  {price} </div>{" "}
                        <div className="row">
                            <Link
                                to={`/product/${_id}/edit`}
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                            >
                                <i className="fas fa-pen"> </i>{" "}
                            </Link>{" "}
                            <div
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                                onClick={() => deleteHandler(_id)}
                            >
                                <i className="fas fa-trash-alt"> </i>{" "}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </>
    );
};

export default Product;
