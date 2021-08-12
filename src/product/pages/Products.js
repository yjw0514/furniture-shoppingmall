import React from 'react';
import { useAuth } from '../../context/auth-context';

export default function Products() {
  const { currentUser } = useAuth();
  return <h1>Products</h1>;
}
