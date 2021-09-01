import { useState } from "react";

export function useSliceProducts(initialLimit, originalProduct) {
  const [limit] = useState(initialLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * limit;
  const firstIndex = lastIndex - limit;
  const currentProducts = originalProduct.slice(firstIndex, lastIndex);
  const count = Math.ceil(originalProduct.length / initialLimit);
  return { setCurrentPage, currentProducts, count };
}
