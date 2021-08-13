import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../../firebase";
import ProductItem from "../components/ProductItem";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dbService.collection("product").onSnapshot((snapshot) => {
      setProducts(
        snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        })
      );
    });
  }, []);
  console.log(products);
  return (
    <div>
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.imageUrl}
          />
        );
      })}
    </div>
  );
}
