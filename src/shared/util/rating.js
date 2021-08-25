import { dbService } from '../../firebase';

export const addComment = (
  productId,
  productName,
  nickName,
  value,
  comment,
  avatar
) => {
  const productDocument = dbService.doc(`/product/${productId}`);
  const ratingDocument = dbService
    .collection('rating')
    .doc(`${productName}_${nickName}`);

  const rateValue = value;

  let prevTotalScore;
  let prevScore;
  let productData;

  productDocument
    .get()
    .then((doc) => {
      productData = doc.data();
      prevTotalScore = productData.rateScore;
      return ratingDocument.get();
    })
    .then((data) => {
      //유저가 별점을 주지않은 제품
      if (!data.exists) {
        console.log('처음 별점주는 제품');
        return dbService
          .collection('rating')
          .doc(`${productName}_${nickName}`)
          .set({
            nickName,
            productId,
            rateValue,
            comment,
            avatar,
            createdAt: new Date().toISOString(),
          })
          .then(() => {
            productData.scoreCount++;
            productData.rateScore = prevTotalScore + rateValue;
            return productDocument.update({
              rateScore: productData.rateScore,
              scoreCount: productData.scoreCount,
              avgRating: productData.rateScore / productData.scoreCount,
            });
          });
      } else {
        //유저가 이미 별점을 부여한 제품
        console.log('이미별점있는 제품');
        ratingDocument
          .get()
          .then((doc) => {
            prevScore = doc.data().rateValue;
          })
          .then(() => {
            return dbService
              .collection('rating')
              .doc(`${productName}_${nickName}`)
              .set({
                nickName,
                productId,
                rateValue,
                comment,
                avatar,
                createdAt: new Date().toISOString(),
              });
          })
          .then(() => {
            productData.rateScore = prevTotalScore - prevScore + rateValue;
            return productDocument.update({
              rateScore: productData.rateScore,
              avgRating: productData.rateScore / productData.scoreCount,
            });
          });
      }
    });
};
