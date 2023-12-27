import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api/firebase";
import Button from "../components/ui/Button";
import { uploadImageToCloudinary } from "../api/uploader"; // 이미지 업로드 함수 import

export default function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]); // 업로드된 이미지들의 URL을 담을 상태
  const [success, setSuccess] = useState();

  useEffect(() => {
    getProductById(id)
      .then((fetchedProduct) => {
        setProduct(fetchedProduct);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleFileChange = async (e, imageNumber) => {
    const file = e.target.files[0];

    // 이미지를 Cloudinary에 업로드하고 해당 URL을 받아옴
    try {
      const imageUrl = await uploadImageToCloudinary(file); // Cloudinary에 이미지 업로드
      setImages((prevImages) => [...prevImages, imageUrl]); // 이미지 URL을 상태에 추가

      setProduct((prevProduct) => ({
        ...prevProduct,
        [`image${imageNumber}`]: imageUrl, // 해당 이미지 번호에 맞는 product 객체에 이미지 URL 추가
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleUpdate = () => {
    // product 업데이트 또는 저장 로직
    updateProduct(id, product)
      .then(() => {
        console.log("Product updated successfully!");
        setSuccess("성공적으로 제품이 추가되었습니다.");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  return (
    <div className="flex flex-col px-12">
      {success && <p className="my-2">✅ {success}</p>}

      <input type="file" onChange={(e) => handleFileChange(e, 1)} />
      <input type="file" onChange={(e) => handleFileChange(e, 2)} />
      <input type="file" onChange={(e) => handleFileChange(e, 3)} />
      <input
        type="text"
        value={product.title || ""}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <input
        type="number"
        value={product.price || ""}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input
        type="text"
        value={product.category || ""}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <input
        type="text"
        value={product.description || ""}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <input
        type="text"
        value={product.link || ""}
        onChange={(e) => setProduct({ ...product, link: e.target.value })}
      />
      <Button text="Update" onClick={handleUpdate} />
    </div>
  );
}
