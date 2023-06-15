import React, { useState, useEffect } from 'react';

const ProductSearch = () => {
  const [product, setProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log('Error fetching product data:', error);
      }
    };

    fetchProductData();

    return () => {
      // Cleanup function
      setProduct(null);
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log(product);
  return (
    <div style={{textAlign:"center",marginTop:"20px"}}>
      <h1>Product Search</h1>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for a product" />

      {product ? (
        <div style={{border:"1px solid",height:"50%",width:"50%",margin:" 10px auto",display:"flex",flexDirection:"column",alignItems:"center",boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <img src={product.products[0].images[0]} alt="" style={{objectFit:"cover",width:"100%",height:"80%",border:"solid 1px"}} />
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:"10px",padding:"10px"}}>

          <h2>product Name: {product.products[0].title}</h2>
          <p>description :{product.products[0].description}</p>
          <p>Price: ${product.products[0].price}</p>
            </div>
        </div>
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
};

export default ProductSearch;
