import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  product: { id, image, title, category, price, image1, discount_price },
}) {
  const navigate = useNavigate();
  const discount = parseInt((discount_price / price) * 100, 10);

  //   console.log("PRODUCT: ", product);

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer"
    >
      {image ? (
        <img className="w-full h-3/4" src={image} alt={title} />
      ) : (
        <img className="w-full h-3/4" src={image1} alt={title} />
      )}
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <div>
          <p className="bg-brand text-white p-2 rounded-sm flex justify-center">
            {100 - discount}% off
          </p>
          <p>
            <span className="text-3xl">{`$${discount_price}`}</span>
            <span> </span>
            <span className="line-through text-gray-500">{`    $${price}`}</span>
          </p>
        </div>
      </div>
      {/* <p className="mb-2 px-2 text-gray-600">{category}</p> */}
    </li>
  );
}
