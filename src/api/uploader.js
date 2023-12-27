export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((data) => data.url);
}

export async function uploadImages(files) {
  const uploadPromises = files.map((file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => data.url);
  });
  console.log("res.json , data.url cloudinary 업로드 성공!");

  return Promise.all(uploadPromises);
}

// export async function uploadImage(file) {
//   const data = new FormData();
//   data.append("file", file);
//   console.log("file: ", file);
//   console.log("file.image: ", file.image);
//   data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
//   return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
//     method: "POST",
//     body: data,
//   })
//     .then((res) => res.json())
//     .then((data) => data.url);
// }

// api/uploader.js

export async function uploadImageToCloudinary(file) {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const result = await response.json();
    return result.url; // 업로드된 이미지의 URL 반환
  } catch (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
}
