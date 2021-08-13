import { useState } from "react";
import { dbService, storage } from "../../firebase";
import Button from "@material-ui/core/Button";

export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    const target = e.target;
    dbService
      .collection("product")
      .add({
        name: target.name.value,
        category: target.category.value,
        price: target.price.value,
        description: target.description.value,
        imageUrl: url,
        date: new Date(),
      })
      .then((result) => {
        window.location.href = "./NewProduct.js";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImage(image);
    }

    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_change",
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <div>
          <label>상품 이미지</label>
          <input type="file" onChange={handleChange} />

          {image ? (
            <img src={url} />
          ) : (
            <div>
              <span>이미지를 업로드해주세요.</span>
            </div>
          )}
        </div>
        <div>
          <label>상품명</label>
          <input type="text" name="name" required />

          <label>상품 카테고리</label>
          <select name="category">
            <option value="none">=== 선택 ===</option>
            <option value="table">책상</option>
            <option value="bed">침대</option>
            <option value="chair">의자</option>
            <option value="sofa">소파</option>
          </select>

          <label>상품 가격</label>
          <input type="number" name="price" required />

          <label>상품 소개 </label>
          <input type="text" name="description" required />
        </div>
        <Button variant="contained">상품 업로드</Button>
      </form>
    </div>
  );
}
