import React, { useEffect, useState } from 'react';
import { databases, Query } from '../../appwrite'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import ProductsCards from '../ProductsCard/ProductsCards';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false); // error state

  useEffect(() => {
    // Fetch popular products
    const fetchProducts = async () => {
      console.log('useEffect triggered');
      try {
        const response = await databases.listDocuments(
          '66cde1b70007c60cbc12', 
          '66cde1ce003c4c7dfb11',
          [
            Query.equal('IsPopular', true) // Filter to only include popular Products
          ]
        );
        setProducts(response.documents);
      } catch (error) {
        console.error('Error fetching Products:', error);
        setHasError(true); 
      }
    };

    fetchProducts();
  }, []);

  if (hasError) {
    return <div>Error fetching Products.</div>; 
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default to 4 on large screens
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 1440, // Large desktop
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024, // Tablet (landscape)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768, // Tablet (portrait)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480, // Mobile (small devices)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <h1 className='course-header'>Popular Products</h1>
      <div className="products-list">
        <Slider {...settings}>
          {products.map(product => (
            <div key={product.$id}>
              <ProductsCards
                id={product.$id}
                title={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
                inSale={product.inSale}
                discountPercentage={product.discountPercentage}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
