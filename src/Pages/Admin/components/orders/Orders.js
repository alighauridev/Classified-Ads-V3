import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import moment from "moment";
const Orders = ({ products, approveProduct }) => {
    const handleApproveClick = (id) => {
        approveProduct(id);
        window.location.reload();
    };
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col"> Name </th> <th scope="col"> description </th>{" "}
                    <th scope="col"> Status </th> <th> Date </th>{" "}
                    <th scope="col" className="text-end">
                        Action{" "}
                    </th>{" "}
                </tr>{" "}
            </thead>{" "}
            <tbody>
                {products?.map((order, index) => {
                    const {
                        // vendor: { name, email },
                        name,
                        price,
                        createdAt,
                        category,
                        approved,
                        description,
                        _id,
                    } = order;
                    return (
                        <tr>
                            <td>
                                <b> {name} </b>{" "}
                            </td>{" "}
                            <td> {description}</td>{" "}
                            <td>
                                <span
                                    className="badge rounded-pill alert-success text-[#000]"
                                    style={
                                        approved
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
                                    {approved ? `Approved` : " Not Approved"}
                                </span>{" "}
                            </td>{" "}
                            <td>
                                {" "}
                                <Moment fromNow>{moment(createdAt)}</Moment>
                            </td>{" "}
                            {/* <td>
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
                            </td>{" "} */}
                            <td className="d-flex justify-content-end align-item-center">
                                <button onClick={() => handleApproveClick(_id)}>Approve</button>
                            </td>{" "}
                        </tr>
                    );
                })}
            </tbody>{" "}
        </table>
    );
};

export default Orders;
