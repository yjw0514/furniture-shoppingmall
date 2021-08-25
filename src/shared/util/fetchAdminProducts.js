import { useEffect, useState } from 'react';
import { dbService } from '../../firebase';

export const UseFetchProducts = (lastDoc) => {
  const [products, setProducts] = useState();
  const [lastVisible, setLastVisible] = useState();
  useEffect(() => {
    dbService
      .collection('product')
      .orderBy('date')
      .startAfter(lastDoc)
      .limit(3)
      .get()
      .then((documentSnapshots) => {
        let loadedProducts = [];
        documentSnapshots.forEach((doc) => loadedProducts.push(doc.data()));
        setProducts(loadedProducts);
        setLastVisible(
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        );
      });
  }, [lastDoc]);
  return { lastVisible, products };
};
