import React, { useEffect } from "react";
import { useState } from "react";
import { dbService } from "../../firebase";
import ProductItem from "../components/ProductItem";
import Container from "@material-ui/core/Container";
import "./ProductList.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import SnackBar from "../../shared/UIElement/SnackBar";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [popularProducts, setPopularProducts] = useState([]);

  const handleClick = () => {
    console.log("ddd");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("useeffect productlist");
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

  useEffect(() => {
    dbService
      .collection("product")
      .orderBy("avgRating", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        setPopularProducts(
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
    x === -10 * (sliderArr.length - (sliderArr.length - 6))
      ? setX(-10 * (sliderArr.length - (sliderArr.length - 6)))
      : setX(x - 10);
  };

  return (
    <div style={{ position: "relative" }}>
      <section className="hero">
        <img src="image/main.jpg" alt="main" />
      </section>

      <Container maxWidth="lg">
        <section className="latest">
          <SnackBar open={open} close={handleClose}>
            장바구니에 담겼습니다.
          </SnackBar>
          <h2 className="title">Latest Products</h2>
          <div className="productlist_wrap">
            <ul
              className="productlist"
              style={{ transform: `translateX(${x}%)` }}
            >
              {products.map((product) => (
                <ProductItem
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl}
                  category={product.category}
                  handleClick={handleClick}
                  avgRating={product.avgRating}
                  reviewCount={product.scoreCount}
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

      <Container maxWidth="lg">
        <section className="popular">
          <SnackBar open={open} close={handleClose}>
            장바구니에 담겼습니다.
          </SnackBar>
          <h2 className="title">Popular Products</h2>
          <div className="productlist_wrap">
            <ul
              className="productlist"
              style={{ transform: `translateX(${x}%)` }}
            >
              {popularProducts.map((product) => (
                <ProductItem
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl}
                  category={product.category}
                  handleClick={handleClick}
                  avgRating={product.avgRating}
                  reviewCount={product.scoreCount}
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
