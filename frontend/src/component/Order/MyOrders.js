import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import './MyOrders.css';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders) || {};
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [dispatch, alert, error]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) =>
                params.value === "Delivered" ? "greenColor" : "redColor",
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.3,
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.id}`}>
                    <LaunchIcon />
                </Link>
            ),
        },
    ];

    const rows = orders
        ? orders.map((item) => ({
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
            itemsQty: item.orderItem?.reduce((acc, curr) => acc + curr.quantity, 0) || 0,
        }))
        : [];

    return (
        <Fragment>
            <MetaData title={`${user?.name}'s Orders`} />
            {loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />
                    <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
                </div>
            )}
        </Fragment>
    );
};

export default MyOrders;
