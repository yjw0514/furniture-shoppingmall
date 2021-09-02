import React, { useEffect, useState } from "react";
import "./PurchaseList.css";
import Container from "@material-ui/core/Container";
import { dbService } from "../../firebase";
import { useAuth } from "../../context/auth-context";
import PurchaseItems from "./PurchaseItems";
import { useSliceProducts } from "../../shared/hooks/UseSliceProducts";
import { Pagination } from "@material-ui/lab";
import CircularLoading from "../../shared/UIElement/CirularLoading";
import { useHistory } from "react-router-dom";

export default function PurchaseList() {
  const { currentUser } = useAuth();
  const [buyProducts, setBuyProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const { setCurrentPage, currentProducts, count } = useSliceProducts(
    3,
    buyProducts
  );

  const onPageChange = (e, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    console.log("useeffect purchaselist");
    const buyRef = dbService.doc(`/buy/${currentUser.uid}`);
    buyRef.onSnapshot((doc) => {
      if (doc.exists) {
        setBuyProducts(doc.data().itemsWithDate);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [buyProducts.length, currentUser.uid]);

  if (loading) {
    return <CircularLoading />;
  }

  let content;
  if (!loading && buyProducts.length === 0) {
    content = (
      <>
        <Container maxWidth="lg">
          <section className="purchaselist">
            <h2>구매내역</h2>
            <div className="noresult_box">
              <h2>구매한 상품이 없습니다.</h2>
              <button onClick={() => history.push("/category")}>
                쇼핑하러 가기
              </button>
            </div>
          </section>
        </Container>
      </>
    );
  } else if (!loading && buyProducts.length > 0) {
    content = (
      <div>
        <Container maxWidth="lg">
          <section className="purchaselist">
            <h2>구매 내역</h2>
            <table className="list_table">
              {/* table title */}
              <thead className="list_thead">
                <tr>
                  <th className="list_th">Date</th>
                  <th className="list_th">Item</th>
                  <th className="list_th"></th>
                  <th className="list_th">Quantity</th>
                  <th className="list_th">Price</th>
                </tr>
              </thead>
              {/* table content */}
              <tbody>
                {currentProducts &&
                  currentProducts.map((buy, index) => (
                    <PurchaseItems
                      key={index}
                      date={buy.date}
                      products={buy.products}
                    />
                  ))}
              </tbody>
            </table>
          </section>
          {/* page */}
          <div className="paging" style={{ width: "100%", marginTop: "40px" }}>
            <Pagination
              count={count}
              variant="outlined"
              color="primary"
              onChange={onPageChange}
            />
          </div>
        </Container>
      </div>
    );
  }

  return content;
}
