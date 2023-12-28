import React, { useState } from "react";
import Button from "../components/ui/Button";

export default function ProductOption() {
  const [discount, setDiscount] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true)
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

      <form className="flex flex-col px-12" onSubmit={handleSubmit}>
        {/* <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
          multiple // 여러 파일 선택 가능하도록 추가
        /> */}

        <input type="text" name="title" value={discount} placeholder="제품명" />

        <Button
          text={isUploading ? "업로드중..." : "제품 등록하기"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
