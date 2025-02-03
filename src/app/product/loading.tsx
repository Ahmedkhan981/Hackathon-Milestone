import React from 'react';
import ProductDetailsSkeleton from '../components/Skeleton/ProductDetailsSkeleton';


const loading:React.FC= () => {
  return (
    <>
    <ProductDetailsSkeleton />
    </>
  );
};

export default loading;