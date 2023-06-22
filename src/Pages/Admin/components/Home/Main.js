import React from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useSelector } from "react-redux";

const Main = () => {
    const Products = useSelector((state) => state.Products);
    const Orders = useSelector((state) => state.Orders);
    const { orders } = Orders;
    const { products } = Products;
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Dashboard </h2>{" "}
                </div>{" "}
                {/* Top Total */} <TopTotal products={products} orders={orders} />
                <div className="row">
                    {" "}
                    {/* STATICS */} <SaleStatistics />
                    <ProductsStatistics />
                </div>
                {/* LATEST ORDER */}{" "}
                <div className="card mb-4 shadow-sm">
                    <LatestOrder orders={orders} />
                </div>{" "}
            </section>{" "}
        </>
    );
};

export default Main;
