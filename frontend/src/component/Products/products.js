import React, { useEffect, Fragment, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './products.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getProduct } from '../../actions/productActions';
import ProductCard from '../product/productCard';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { products, loading, error, productCount } = useSelector((state) => state.products);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(9); // Match backend resultPerPage
    // Remove price and priceRange state
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = [
        'All',
        'Electronics',
        'Books',
        'fruit',
        
    ];

    const keyword = searchParams.get('keyword');

    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
        dispatch(getProduct(keyword, currentPage, null, selectedCategory === 'All' ? null : selectedCategory));
        setCurrentPage(1); // Reset to first page when searching
    }, [dispatch, error, keyword, selectedCategory]);

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage, null, selectedCategory === 'All' ? null : selectedCategory));
    }, [currentPage, keyword, selectedCategory, dispatch]);

    // Calculate pagination
    const totalPages = Math.ceil((productCount || 0) / pageSize);

    console.log("Pagination Debug:", {
        productCount,
        pageSize,
        totalPages,
        currentPage,
        productsLength: products?.length,
        condition: totalPages > 1
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    // Remove price filter handlers and resetPriceFilter

    // Navigation handlers
    const goBack = () => {
        if (keyword) {
            // If we're on a search page, go back to all products
            navigate('/products');
        } else {
            // If we're on the main products page, go to home
            navigate('/');
        }
    };

    const goToAllProducts = () => {
        navigate('/products');
    };

    // Removed categories array and category bar UI

    // Handle loading state
    if (loading) {
        return (
            <Fragment>
                <MetaData title="Products" />
                <div className="loading-container">
                    <Loader />
                </div>
            </Fragment>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Fragment>
                <MetaData title="Error" />
                <div className="empty-state">
                    <h3>Something went wrong!</h3>
                    <p>{error}</p>
                    <div className="empty-state-actions">
                        <button onClick={goBack} className="back-btn">
                            ← Go Back
                        </button>
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            Try Again
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }

    // Handle empty state
    if (!products || products.length === 0) {
        return (
            <Fragment>
                <MetaData title="Products" />
                <h1 id="products_heading" className={keyword ? 'search-results' : ''}>
                    {keyword ? `Search Results for "${keyword}"` : "Our Products"}
                </h1>
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>
                        {keyword 
                            ? `No products match your search for "${keyword}"`
                            : "No products available at the moment."
                        }
                    </p>
                    <div className="empty-state-actions">
                        <button onClick={goBack} className="back-btn">
                            ← Go Back
                        </button>
                        {keyword && (
                            <button onClick={goToAllProducts} className="view-all-btn">
                                View All Products
                            </button>
                        )}
                        <button onClick={() => window.location.reload()} className="retry-btn">
                            Refresh Page
                        </button>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <MetaData title="Products" />
            <h1 id="products_heading" className={keyword ? 'search-results' : ''}>
                {keyword ? `Search Results for "${keyword}"` : "Our Products"}
            </h1>
            
            <div className="products-layout">
                {/* Sidebar - Only Category Filter */}
                <div className="sidebar-filter">
                    <div className="filter-container">
                        <h3>Filter by Category</h3>
                        <div className="category-dropdown" style={{ marginTop: '2rem' }}>
                            <label htmlFor="category-select" style={{ fontWeight: 500, marginRight: 8 }}>Category:</label>
                            <select
                                id="category-select"
                                value={selectedCategory}
                                onChange={e => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="main-content">
                    <section id="products" className="container">
                        <div className="productsContainer">
                            {products.map((product) => (
                                <ProductCard key={product._id} Product={product} />
                            ))}
                        </div>
                        
                        {/* Product count info */}
                        <div className="product-count-info">
                            Showing {products.length} of {productCount || 0} products
                            {keyword && ` for "${keyword}"`}
                        </div>

                        {/* Pagination */}
                        {totalPages >= 1 && (
                            <div className="paginationBox">
                                <div className="pagination">
                                    {/* 1st Button */}
                                    <button
                                        className="pageBtn first-btn"
                                        onClick={() => handlePageChange(1)}
                                        disabled={currentPage === 1}
                                    >
                                        1st
                                    </button>
                                    {/* Previous Button */}
                                    <button
                                        className="pageBtn prev-btn"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Prev
                                    </button>
                                    {/* Page Numbers (show up to 3 around current) */}
                                    {(() => {
                                        const pages = [];
                                        let start = Math.max(1, currentPage - 1);
                                        let end = Math.min(totalPages, currentPage + 1);
                                        if (currentPage === 1) end = Math.min(totalPages, 3);
                                        if (currentPage === totalPages) start = Math.max(1, totalPages - 2);
                                        for (let i = start; i <= end; i++) {
                                            pages.push(i);
                                        }
                                        return pages.map((page) => (
                                            <button
                                                key={page}
                                                className={`pageBtn num-btn${currentPage === page ? ' active' : ''}`}
                                                onClick={() => handlePageChange(page)}
                                                disabled={currentPage === page}
                                            >
                                                {page}
                                            </button>
                                        ));
                                    })()}
                                    {/* Next Button */}
                                    <button
                                        className="pageBtn next-btn"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Next
                                    </button>
                                    {/* Last Button */}
                                    <button
                                        className="pageBtn last-btn"
                                        onClick={() => handlePageChange(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Last
                                    </button>
                                </div>
                                <div className="page-info">
                                    Page {currentPage} of {totalPages}
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </Fragment>
    );
};

export default Products;