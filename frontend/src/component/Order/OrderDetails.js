import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
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

  console.log("ORDER FROM REDUX:", order); 
  return (
    <>
      <MetaData title="Order Details" />
      {loading ? (
        <Loader />
      ) : (
        order && (
          <div className="orderDetailsPage">
            <h1>Order #{order._id}</h1>

            {/* Shipping Info */}
            <div className="sectionCard">
              <h2>Shipping Info</h2>
              <p>
                <strong>Name:</strong> {order.user?.name}
              </p>
              <p>
                <strong>Phone:</strong> {order.shippingInfo?.phoneNo}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.pinCode}, ${order.shippingInfo?.country}`}
              </p>
            </div>

            {/* Order Status */}
            <div className="sectionCard">
              <h2>Order Status</h2>
              <p
                className={`statusText ${order.orderStatus === "Delivered" ? "delivered" : "pending"
                  }`}
              >
                {order.orderStatus}
              </p>
            </div>

            {/* Payment Info */}
            <div className="sectionCard">
              <h2>Payment Info</h2>
              <p
                className={
                  order.paymentInfo?.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order.paymentInfo?.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>

            {/* Total Amount */}
            <div className="sectionCard">
              <h2>Total Amount</h2>
              <p className="amountText">Rs {order.totalPrice?.toFixed(2)}</p>
            </div>


            {/* <div className="confirmCartItems">
              <div className="confirmCartItemsContainer">
                {order?.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt={item.name} />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} x ₹{item.price} = <b>₹{(item.price * item.quantity).toFixed(2)}</b>
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No order items found.</p>
                )}

              </div>
            </div> */}
          </div>
        )
      )}
    </>
  );
};

export default OrderDetails;
