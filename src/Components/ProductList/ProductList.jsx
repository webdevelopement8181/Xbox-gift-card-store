import React, { useEffect, useState } from 'react';
import { databases, Query } from '../../appwrite'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import ProductsCards from '../ProductsCard/ProductsCards';
import './ProductList.css';

const ProductList = () => {
  const [Products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false); // error state

  useEffect(() => {
    // Add this line
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
        // Set error state if fetch fails
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
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
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
      <div className="Products-list">
        <Slider {...settings}>
          {Products.map(course => (
            <div key={course.$id}>
              <ProductsCards
                id={course.$id}
                title={course.title}
                description={course.description}
                price={course.price}
                image={course.image}
                inSale={course.inSale}  // Pass isInSale
                discountPercentage={course.discountPercentage}  // Pass discountPercentage
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};


export default ProductList;