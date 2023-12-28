import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import { useAuthContext } from "../components/context/AuthContext";
import { addOrUpdateToCart } from "../api/firebase";
import { Link } from "react-router-dom";
import { BsFillPencilFill } from "react-icons/bs";

export default function ProductDetail() {
  const { uid, user } = useAuthContext();
  const {
    state: {
      product: {
        id,
        image,
        title,
        description,
        category,
        price,
        // options,
        image1,
        image2,
        image3,
        link,
      },
    },
  } = useLocation();

  // const [selected, setSelected] = useState(options && options[0]);
  // // const handleSelect = (e) => {
  // //   setSelected(e.target.value);
  // };
  const handleClick = (e) => {
    const product = { id, image1, title, price, quantity: 1 };
    addOrUpdateToCart(uid, product);
  };

  return (
    <>
      {/* 'edit' 버튼을 클릭했을 때 해당 제품의 ID를 ProductEdit 페이지로 전달 */}
      {user && user.isAdmin && (
        <div className="flex justify-end">
          <Link to={`/products/edit/${id}`}>
            <Button text="edit" />
          </Link>
        </div>
      )}
      <p className="mx-12 mt-4 text-gray-700">{category}</p>

      <section className="flex flex-col md:flex-row p-4">
        {image && (
          <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        )}

        {image1 && (
          <img className="w-full px-4 basis-7/12" src={image1} alt={title} />
        )}

        {/* {image2 && (
          <img className="w-full px-4 basis-7/12" src={image2} alt={title} />
        )}

        {image3 && (
          <img className="w-full px-4 basis-7/12" src={image3} alt={title} />
        )} */}
        {/* <img className="w-full px-4 basis-7/12" src={image1} alt={title} /> */}

        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="py-4 text-lg">{description}</p>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            ${price}
          </p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              링크:{" "}
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </label>
          </div>

          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
      <section className="flex flex-col md:flex-col p-4">
        {image2 && (
          <img className="w-full px-4 basis-7/12" src={image2} alt={title} />
        )}

        {image3 && (
          <img className="w-full px-4 basis-7/12" src={image3} alt={title} />
        )}
      </section>
    </>
  );
}
