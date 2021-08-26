import React, { useEffect, useState } from "react";
import "./PurchaseList.css";
import Container from "@material-ui/core/Container";
import { dbService } from "../../firebase";
import { useAuth } from "../../context/auth-context";
import PurchaseItems from "./PurchaseItems";

export default function PurchaseList() {
  const { currentUser } = useAuth();
  const buyRef = dbService.doc(`/buy/${currentUser.uid}`);
  const [buyProducts, setBuyProducts] = useState([]);

  useEffect(() => {
    console.log("useeffect purchaselist");
    const buyRef = dbService.doc(`/buy/${currentUser.uid}`);

    buyRef.onSnapshot((doc) => {
      if (doc.exists) {
        setBuyProducts(doc.data().itemsWithDate);
        // console.log(doc.data().itemsWithDate);
      } else if (buyProducts.length === 0) {
        return <div>구매한 상품이 없습니다.</div>;
      }
    });
  }, [buyProducts.length, currentUser.uid]);

  return (
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
              {buyProducts &&
                buyProducts.map((buy) => (
                  <PurchaseItems
                    key={buy.index}
                    date={buy.date}
                    products={buy.products}
                  />
                ))}
            </tbody>
          </table>
        </section>
      </Container>
    </div>
  );
}
