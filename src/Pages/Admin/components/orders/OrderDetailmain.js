import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deliverOrder,
    getOrderDetails,
} from "../../Redux/actions/orderActions";
import {
    ORDER_DELIVER_RESET,
    ORDER_DETAILS_RESET,
} from "../../Redux/constants/orderConstants";
import Moment from "react-moment";

const OrderDetailmain = ({ id }) => {
    const dispatch = useDispatch();
    const OrderDetails = useSelector((state) => state.OrderDetails);
    const OrderDeliver = useSelector((state) => state.OrderDeliver);
    const {
        order: {
            shippingDetails,
            user,
            orderItems,
            shippingPrice,
            totalPrice,
            taxPrice,
            isPaid,
            _id,
            createdAt,
            updatedAt,
            isDelivered,
        },
    } = OrderDetails;
    const { loading, success } = OrderDeliver;
    useEffect(() => {
        if (id) {
            dispatch(getOrderDetails(id));
        }
        if (success) {
            dispatch({ type: ORDER_DELIVER_RESET });
        }
    }, [dispatch, id, success]);

    const deliverHandler = () => {
        dispatch(deliverOrder(_id));
    };
    return (
        <section className="content-main">
            <div className="content-header">
                <Link to="/orders" className="btn btn-dark text-white">
                    Back To Orders{" "}
                </Link>{" "}
            </div>
            <div className="card">
                <header
                    className="card-header p-3 Header-green"
                    style={{ backgroundColor: "#4fa607" }}
                >
                    <div className="row align-items-center ">
                        <div className="col-lg-6 col-md-6">
                            <span>
                                <i className="far fa-calendar-alt mx-2"> </i>{" "}
                                <b className="text-white">
                                    {" "}
                                    <Moment format="MMM Do YYYY">{createdAt}</Moment>{" "}
                                </b>{" "}
                            </span>{" "}
                            <br />
                            <small className="text-white mx-3 ">Order ID: {_id} </small>{" "}
                        </div>{" "}
                        <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                            <select
                                className="form-select d-inline-block"
                                style={{
                                    maxWidth: "200px",
                                }}
                            >
                                <option> Change status </option>{" "}
                                <option> Awaiting payment </option> <option> Confirmed </option>{" "}
                                <option> Shipped </option> <option> Delivered </option>{" "}
                            </select>{" "}
                            <Link className="btn btn-success ms-2" to="#">
                                <i className="fas fa-print"> </i>{" "}
                            </Link>{" "}
                        </div>{" "}
                    </div>{" "}
                </header>{" "}
                <div className="card-body">
                    {" "}
                    {/* Order info */}{" "}
                    <OrderDetailInfo shippingDetails={shippingDetails} />
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="table-responsive">
                                <OrderDetailProducts
                                    orderItems={orderItems}
                                    isPaid={isPaid}
                                    shippingPrice={shippingPrice}
                                    totalPrice={totalPrice}
                                    taxPrice={taxPrice}
                                />
                            </div>{" "}
                        </div>{" "}
                        {/* Payment Info */}{" "}
                        <div className="col-lg-3">
                            <div className="box shadow-sm bg-light">
                                {isDelivered ? (
                                    <button className="btn btn-dark col-12">
                                        DELIVERED <Moment format="MMM Do YYYY">{updatedAt}</Moment>{" "}
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-dark col-12"
                                        onClick={deliverHandler}
                                    >
                                        MARK AS DELIVERED
                                    </button>
                                )}
                            </div>{" "}
                        </div>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </section>
    );
};

export default OrderDetailmain;
