// src/component/Route/ProductRoute.js
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProductRoute = ({ element: Component }) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    return (
        <Fragment>
            {!loading && (
                isAuthenticated ? (
                    Component
                ) : (
                    <Navigate to="/login" replace state={{ from: location }} />
                )
            )}
        </Fragment>
    );
};

export default ProductRoute;
