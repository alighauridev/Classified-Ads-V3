import React, { useEffect } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../Redux/actions/productActions";
const ProductScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts());
    }, [])

    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Header />
                <MainProducts />
            </main>{" "}
        </>
    );
};

export default ProductScreen;
