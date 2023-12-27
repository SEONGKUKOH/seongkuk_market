import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function getProductById(productId) {
  try {
    const snapshot = await get(ref(database, `products/${productId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// 제품 정보를 업데이트하는 함수
export async function updateProduct(productId, updatedProductInfo) {
  try {
    await set(ref(database, `products/${productId}`), updatedProductInfo);
    return "Product updated successfully";
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// export async function addNewProduct(product, image) {
//   const id = uuid();
//   console.log("product", product);
//   console.log("image url", image);
//   return set(ref(database, `products/${id}`), {
//     ...product,
//     id,
//     image,
//     // price: parseInt(product.price),
//     // image,
//     // options: product.options.split(","),
//   });
// }

export async function addNewProduct(product, images) {
  const id = uuid();
  console.log("product", product);
  console.log("images", images);

  if (Array.isArray(images) && images.length > 0) {
    const imagesData = {};
    images.forEach((image, index) => {
      imagesData[`image${index + 1}`] = image;
    });

    // 이미지들을 단일 제품 ID 하위에 저장
    return set(ref(database, `products/${id}`), {
      ...product,
      id,
      ...imagesData,
    });
  } else {
    console.error("Invalid images:", images);
    return Promise.reject(new Error("Invalid images value"));
  }
}

// export async function addNewProduct(product, image) {
//   const id = uuid();
//   console.log("product", product);
//   console.log("image url", image);

//   // 이미지가 유효한 경우에만 Firebase 데이터베이스에 제품을 추가
//   if (image) {
//     return set(ref(database, `products/${id}`), {
//       ...product,
//       id,
//       image,
//     });
//   } else {
//     console.error("Invalid image:", image);
//     return Promise.reject(new Error("Invalid image value"));
//   }
// }

// // addNewProduct 함수: 새 제품을 추가하는 함수
// export async function addNewProduct(product, image) {
//   const id = uuid();
//   return set(ref(database, `products/${id}`), {
//     ...product,
//     id,
//     price: parseInt(product.price),
//     image,
//     options: product.options.split(","),
//   });
// }

export async function getProducts() {
  return get(ref(database, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
