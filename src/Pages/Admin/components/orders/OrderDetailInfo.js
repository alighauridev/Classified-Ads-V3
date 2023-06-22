import React, { useEffect } from "react";

const OrderDetailInfo = ({ shippingDetails }) => {
    return (
        <div className="row mb-5 order-info-wrap">
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-user"> </i>{" "}
                    </span>{" "}
                    <div className="text">
                        <h6 className="mb-1"> Customer </h6>{" "}
                        <p className="mb-1">
                            {shippingDetails.firstName + " " + shippingDetails.lastName}{" "}
                            <br />
                            <a href={`mailto:user@example.com`}>
                                {" "}
                                {shippingDetails.email}{" "}
                            </a>{" "}
                        </p>{" "}
                    </div>{" "}
                </article>{" "}
            </div>{" "}
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-truck-moving"> </i>{" "}
                    </span>{" "}
                    <div className="text">
                        <h6 className="mb-1"> Order info </h6>{" "}
                        <p className="mb-1">
                            Shipping: Tanzania <br /> Pay method: PayPal{" "}
                        </p>{" "}
                    </div>{" "}
                </article>{" "}
            </div>{" "}
            <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle alert-success">
                        <i className="text-success fas fa-map-marker-alt"> </i>{" "}
                    </span>{" "}
                    <div className="text">
                        <h6 className="mb-1"> Deliver to </h6>{" "}
                        <p className="mb-1">
                            Address: {shippingDetails.address} <br />
                            {shippingDetails.city}, {shippingDetails.province},
                            {shippingDetails.country} <br /> P.O{" "}
                            {shippingDetails.address} {shippingDetails.zip}{" "}
                        </p>{" "}
                    </div>{" "}
                </article>{" "}
            </div>{" "}
        </div>
    );
};

export default OrderDetailInfo;
