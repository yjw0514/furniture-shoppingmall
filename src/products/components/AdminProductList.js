import React from "react";
import Container from "@material-ui/core/Container";
import { Pagination } from "@material-ui/lab";
import AdminProductItem from "./AdminProductItem";
import "./AdminProductList.css";

export default function AdminProductList({
  loading,
  currentProducts,
  setCurrentPage,
  count,
}) {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const onPageChange = (e, value) => {
    setCurrentPage(value);
  };
  return (
    <div>
      <Container maxWidth="lg">
        <section className="admin__product">
          <h2>제품목록</h2>
          <table className="cart_table" style={{ height: "400px" }}>
            {/* table title */}
            <thead>
              <tr>
                <th>Item</th>
                <th>제품명</th>
                <th>Category</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {/* table content */}
            <tbody>
              {currentProducts.map((product) => (
                <AdminProductItem
                  id={product.productId}
                  key={product.productId}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                />
              ))}
            </tbody>
          </table>
          {/* page */}
          <div className="paging" style={{ width: "100%", marginTop: "40px" }}>
            <Pagination
              count={count}
              variant="outlined"
              color="primary"
              onChange={onPageChange}
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
