import React, { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImages } from "../api/uploader"; // 수정된 파일명으로 import
import Button from "../components/ui/Button";
export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [files, setFiles] = useState([]); // files를 배열로 변경
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (name === "file") {
      setFiles(Array.from(selectedFiles)); // 여러 파일을 배열로 설정
      // console.log("selectedFiles: ", selectedFiles);
      console.log("files: ", files);
      return;
    }
    setProduct((prevProduct) => ({ ...prevProduct, [name]: e.target.value }));
    // console.log("product: ", product);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImages(files)
      .then((urls) => {
        console.log("files urls: ", urls);

        // 이미지들을 단일 제품 ID 하위에 저장하기 위해 addNewProduct 호출
        return addNewProduct({ ...product }, urls);
      })
      .then(() => {
        setSuccess("성공적으로 제품이 추가되었습니다.");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      })
      .finally(() => setIsUploading(false));

  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {files.length > 0 && (
        <div>
          {files.map((file, index) => (
            <img
              key={index}
              className="w-96 mx-auto mb-2"
              src={URL.createObjectURL(file)}
              alt={`local file ${index}`}
            />
          ))}
        </div>
      )}
      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
          multiple // 여러 파일 선택 가능하도록 추가
        />

        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="정가"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        {/* <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        /> */}
        <input
          type="text"
          name="link"
          value={product.link ?? ""}
          placeholder="원본링크"
          required
          onChange={handleChange}
        />

        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
