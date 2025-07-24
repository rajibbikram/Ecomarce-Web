import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader";
import { useAlert } from "react-alert";
import "./OrderDetails.css";

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { order, error, loading } = useSelector((state) => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);

    return (
        <>
            <MetaData title="Order Details" />
            {loading ? (
                <Loader />
            ) : (
                order && (
                    <div className="orderDetailsPage">
                        <h1>Order #{order._id}</h1>

                        <div className="sectionCard">
                            <h2>Shipping Info</h2>
                            <p><strong>Name:</strong> {order.user?.name}</p>
                            <p><strong>Phone:</strong> {order.shippingInfo?.phoneNo}</p>
                            <p><strong>Address:</strong>
                                {`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.postalCode}, ${order.shippingInfo?.country}`}
                            </p>
                        </div>

                        <div className="sectionCard">
                            <h2>Order Status</h2>
                            <p className={`statusText ${order.orderStatus === 'Delivered' ? 'delivered' : 'pending'}`}>
                                {order.orderStatus}
                            </p>
                        </div>

                        <div className="sectionCard">
                            <h2>Total Amount</h2>
                            <p className="amountText">Rs {order.totalPrice?.toFixed(2)}</p>
                        </div>
                        <div className="sectionCard">
                            <h2>Order Items</h2>
                            <div className="orderItems">
                                {order.orderItems?.map((item) => (
                                    <div className="orderItemCard" key={item.product}>
                                        <img src={item.image} alt={item.name || "Product"} />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name || "Unnamed Product"}
                                        </Link>
                                        <span>
                                            {item.quantity} × ${item.price.toFixed(2)} = $
                                            {(item.quantity * item.price).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                )
            )}
        </>
    );
};

export default OrderDetails;
