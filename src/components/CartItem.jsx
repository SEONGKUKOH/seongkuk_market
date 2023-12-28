import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";
import { RiDeleteBin5Fill } from "react-icons/ri"; // RiDeleteBin5Fill 아이콘을 가져옵니다.

const ICON_CLASS =
  "transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1";

export default function CartItem({
  product,
  product: { id, image1, title, quantity, price },
  uid,
}) {
  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => removeFromCart(uid, id);
  return (
    <li className="flex justify-between my-2 items-center">
      <img className="w-24 md:2-48 rounded-lg" src={image1} alt={title} />
      <div className="flex-1 flex justify-between ml-4">
        <div>
          <p className="text-lg">{title}</p>
          {/* <p className="text-2xl font-bold text-brand">{option}</p> */}
          <p>{price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare onClick={handlePlus} />
          <RiDeleteBin5Fill onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
