import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../../firebase";
import ProductItem from "../components/ProductItem";
import Container from "@material-ui/core/Container";
import "./ProductList.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    dbService
      .collection("product")
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setProducts(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      });
  }, []);

  const sliderArr = products;
  const [x, setX] = useState(0);

  const prevSlide = () => {
    x === 0 ? setX(0) : setX(x + 10);
  };
  const nextSlide = () => {
    x === -10 * (sliderArr.length - (sliderArr.length - 5))
      ? setX(-10 * (sliderArr.length - (sliderArr.length - 5)))
      : setX(x - 10);
  };

  return (
    <div>
      <section className="hero">
        <img src="image/main.jpg" alt="main-image" />
      </section>

      <Container maxWidth="lg">
        <section className="latest">
          <h2 className="title">Latest Products</h2>
          <div className="productlist_wrap">
            <ul
              className="productlist"
              style={{ transform: `translateX(${x}%)` }}
            >
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl}
                  category={product.category}
                />
              ))}
            </ul>
          </div>
          <button className="slide_left" onClick={prevSlide}>
            <FaAngleLeft />
          </button>
          <button className="slide_right" onClick={nextSlide}>
            <FaAngleRight />
          </button>
        </section>
      </Container>
    </div>
  );
}
