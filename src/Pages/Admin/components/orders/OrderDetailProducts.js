import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = ({ orderItems, isPaid, taxPrice, totalPrice, shippingPrice }) => {
    const total = orderItems?.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
    return (
        <table className="table border table-lg">
            <thead>
                <tr>
                    <th
                        style={{
                            width: "40%",
                        }}
                    >
                        {" "}
                        Product{" "}
                    </th>{" "}
                    <th
                        style={{
                            width: "20%",
                        }}
                    >
                        {" "}
                        Unit Price{" "}
                    </th>{" "}
                    <th
                        style={{
                            width: "20%",
                        }}
                    >
                        {" "}
                        Quantity{" "}
                    </th>{" "}
                    <th
                        style={{
                            width: "20%",
                        }}
                        className="text-end"
                    >
                        Total{" "}
                    </th>{" "}
                </tr>{" "}
            </thead>{" "}
            <tbody>
                {orderItems?.map((order, index) => {
                    const { title, price, qty, image } = order;
                    const orderPrice = Number(order.qty * order.price).toFixed(2);
                    return (
                        <tr>
                            <td>
                                <Link className="itemside" to="#">
                                    <div className="left">
                                        <img
                                            src={image}
                                            alt="product"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                            }}
                                            className="img-xs"
                                        />
                                    </div>{" "}
                                    <div className="info">{title}</div>{" "}
                                </Link>{" "}
                            </td>{" "}
                            <td> ${price}</td> <td> {qty}</td>{" "}
                            <td className="text-end"> ${orderPrice}</td>{" "}
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan="4">
                        <article className="float-end">
                            <dl className="dlist">
                                <dt> Subtotal: </dt> <dd>${total}</dd>
                            </dl>{" "}
                            <dl className="dlist">
                                <dt> Shipping cost: </dt> <dd>${shippingPrice}</dd>
                            </dl>{" "}
                            <dl className="dlist">
                                <dt> Tax Price: </dt>{" "}
                                <dd>
                                    <b className="h5"> ${taxPrice} </b>{" "}
                                </dd>{" "}
                            </dl>{" "}
                            <dl className="dlist">
                                <dt> Grand total: </dt>{" "}
                                <dd>
                                    <b className="h5"> ${totalPrice} </b>{" "}
                                </dd>{" "}
                            </dl>{" "}
                            <dl className="dlist">
                                <dt className="text-muted"> Status: </dt>{" "}
                                <dd>
                                    <span
                                        className={`badge rounded-pill alert ${isPaid
                                            ? "alert-success text-success"
                                            : "alert-danger text-danger"
                                            }`}
                                    >
                                        {isPaid ? "Payment done" : "Not Paid"}{" "}
                                    </span>{" "}
                                </dd>{" "}
                            </dl>{" "}
                        </article>{" "}
                    </td>{" "}
                </tr>{" "}
            </tbody>{" "}
        </table>
    );
};

export default OrderDetailProducts;
