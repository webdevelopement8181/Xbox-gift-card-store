import React, { useState, useEffect, Suspense } from 'react';
import {Helmet} from "react-helmet";
import Footer from '../Footer/Footer';

// Lazy load the ProductList component
const LazyProductList = React.lazy(() => import('../ProductList/ProductList'));

const Home = () => {
    const [showProductList, setShowProductsList] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShowProductsList(true);
                    observer.disconnect(); // Disconnect once loaded to prevent further triggers
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the target is visible
            }
        );

        const target = document.querySelector('#product-list-placeholder');
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div>
            {/* Helmet for setting dynamic SEO elements */}
            <Helmet>
                <title>Home </title>
                <meta name="description" content="Welcome to the homepage of Your Brand, where you can find the best products available." />
                <link rel="canonical" href="" />
            </Helmet>

            <div id="product-list-placeholder" style={{ height: '200px', backgroundColor: 'blue' }}>
                THIS IS THE PLACEHOLDER
            </div>

            {/* Only show ProductList when showProductsList becomes true */}
            {showProductList && (
                <Suspense fallback={<div>Loading...</div>}>
                    <LazyProductList />
                </Suspense>
            )}

            <Footer />
        </div>
    );
};

export default Home;
