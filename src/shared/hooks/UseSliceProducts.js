import { useEffect, useState } from 'react';

export function useSliceProducts(initialLimit, originalProduct) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [limit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;

  useEffect(() => {
    setCurrentProducts(originalProduct.slice(firstIndex, lastIndex));
  }, [originalProduct, firstIndex, lastIndex]);

  useEffect(() => {
    if (currentProducts.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentProducts.length, currentPage]);

  const count = Math.ceil(originalProduct.length / initialLimit);
  return { setCurrentPage, currentProducts, count, setCurrentProducts };
}
