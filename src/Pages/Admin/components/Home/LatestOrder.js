import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const LatestOrder = ({ orders }) => {
    return (
        <div className="card-body">
            <h5 className="card-title"> Latest orders </h5>{" "}
            <div className="table-responsive">
                <table className="table">
                    <tbody>
                        {orders?.slice(0, 5).map((order, index) => {
                            const {
                                user: { name, email },
                                isPaid,
                                isDelivered,
                                createdAt,
                                totalPrice,
                                _id,
                            } = order;
                            return (
                                <tr>
                                    <td>
                                        <b> {name} </b>{" "}
                                    </td>{" "}
                                    <td> {email}</td> <td> ${totalPrice} </td>{" "}
                                    <td>
                                        <span
                                            className="badge rounded-pill alert-success text-[#000]"
                                            style={
                                                isPaid
                                                    ? {
                                                        color: "#0f5132",
                                                        backgroundColor: "#d1e7dd",
                                                        borderColor: "#badbcc",
                                                    }
                                                    : {
                                                        color: "#842029",
                                                        backgroundColor: "#f8d7da",
                                                        borderColor: "#f5c2c7",
                                                    }
                                            }
                                        >
                                            {isPaid ? `Paid` : " Not Paid"}
                                        </span>{" "}
                                    </td>{" "}
                                    <td>
                                        {" "}
                                        <Moment format="MMM Do YY">{createdAt}</Moment>
                                    </td>{" "}
                                    <td>
                                        <span
                                            className="badge btn-success"
                                            style={
                                                isDelivered
                                                    ? {
                                                        color: "#fff",
                                                        backgroundColor: "#198754",
                                                        borderColor: "#198754",
                                                    }
                                                    : {
                                                        color: "#fff",
                                                        backgroundColor: "#212529",
                                                        borderColor: "#212529",
                                                    }
                                            }
                                        >
                                            {" "}
                                            {isDelivered ? "Delivered" : " Not Delivered"}{" "}
                                        </span>{" "}
                                    </td>{" "}
                                    <td className="d-flex justify-content-end align-item-center">
                                        <Link to={`/order/${_id}`} className="text-success">
                                            <i className="fas fa-eye"> </i>{" "}
                                        </Link>{" "}
                                    </td>{" "}
                                </tr>
                            );
                        })}
                    </tbody>{" "}
                </table>{" "}
            </div>{" "}
        </div>
    );
};

export default LatestOrder;
