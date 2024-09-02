import React, { useEffect, useState } from 'react';
import { databases } from '../../appwrite'; 
import CourseCard from '../CourseCard/CourseCards';
import './Products.css'; // Adjust the import based on your file structure

const Products = () => {
  const [products, setProducts] = useState([]);
  const [hasError, setHasError] = useState(false);

  // Database and Collection IDs
  const databaseId = '66cde1b70007c60cbc12'; // replace with your actual Database ID
  const collectionId = '66cde1ce003c4c7dfb11'; // replace with your actual Collection ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,  // Use the databaseId directly here
          collectionId  // Use the collectionId directly here
        );
        setProducts(response.documents);
      } catch (error) {
        console.error('Error fetching products:', error);
        setHasError(true); // Handle errors gracefully
      }
    };

    fetchProducts();
  }, []);

  if (hasError) {
    return <div>Error fetching products.</div>;
  }

  return (
    <div>
      <h1 className='product-header'>All Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <CourseCard
            key={product.$id}
            id={product.$id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            isPopular={product.isPopular} // Pass isPopular to ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
