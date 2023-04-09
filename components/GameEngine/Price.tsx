import React from "react";
import useGetPrice from "./hooks/useGetPrice";

const Price = () => {
  const { data: price } = useGetPrice();
  console.log(price?.toNumber());

  return null;
};

export default Price;
