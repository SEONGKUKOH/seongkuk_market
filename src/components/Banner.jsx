import React from "react";

export default function Banner() {
  return (
    <section className="h-96 bg-yellow-900 relative">
      <div className="w-full h-full bg-cover bg-banner opacity-70" />
      <div className="absolute w-full top-32 text-center text-gray-50">
        <h1 className="text-6xl ">Don't miss it!</h1>
        <p className="text-2xl ">Discount for you!</p>
      </div>
    </section>
  );
}
