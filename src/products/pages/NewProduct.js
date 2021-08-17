import { useRef, useState } from 'react';
import { dbService, storage } from '../../firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { Container, MenuItem, Paper, Select } from '@material-ui/core';

import './NewProduct.css';
import { validateUploadProduct } from '../../shared/util/validators';
import { Alert } from '@material-ui/lab';

export default function NewProduct() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [inputs, setInputs] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });
  const fileInput = useRef();

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(inputs);
    const { errors, valid } = validateUploadProduct(inputs);
    console.log(errors);
    if (!valid) {
      return setError(errors);
    }

    const target = e.target;
    dbService
      .collection('product')
      .add({
        name: target.name.value,
        category: inputs.category,
        price: inputs.price,
        description: inputs.description,
        imageUrl: url,
        date: new Date(),
      })
      .then((result) => {
        window.location.href = './NewProduct.js';
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

    setLoading(true);
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      'state_change',
      null,
      (error) => {
        console.error(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setLoading(false);
          });
      }
    );
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Container maxWidth='lg' style={{ height: '100vh', marginTop: '60px' }}>
      <Paper className='upload__form-container' elevation={0}>
        <h2>제품 업로드</h2>
        <form onSubmit={handleUpload} className='upload__form'>
          <div className='form__control'>
            <div className='form__control-label'>
              <span>*</span>
              <label>상품사진</label>
            </div>
            <div
              className='preview__image'
              onClick={() => fileInput.current.click()}
            >
              {loading && <CircularProgress disableShrink />}
              {!loading && image ? (
                <img src={url} alt='previewImage' />
              ) : (
                <span className='preview__desc'>이미지를 업로드해주세요.</span>
              )}
            </div>
          </div>
          <div className='filebox'>
            <input
              type='file'
              onChange={handleChange}
              ref={fileInput}
              required
            />
          </div>

          <div className='form__control'>
            <div className='form__control-label'>
              <span>*</span>
              <label>상품명</label>
            </div>
            <input type='text' name='name' required onChange={inputHandler} />
          </div>
          <div className='form__control'>
            <div className='form__control-label'>
              <span>*</span>
              <label>상품 가격:</label>
            </div>
            <input
              type='number'
              name='price'
              required
              onChange={inputHandler}
              style={{ width: '200px' }}
            />
          </div>
          <div className='form__control'>
            <div className='form__control-label'>
              <span>*</span>
              <label>상품 소개 </label>
            </div>
            <textarea
              type='text'
              name='description'
              required
              rows={5}
              onChange={inputHandler}
            />
          </div>
          {error && (
            <Alert severity='error' style={{ width: '300px' }}>
              {error.description}
            </Alert>
          )}

          <div className='form__control select'>
            <div className='form__control-label'>
              <span>*</span>
              <label>상품 카테고리</label>
            </div>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              fullWidth={true}
              name='category'
              value={inputs.category}
              onChange={inputHandler}
              style={{ width: '200px' }}
            >
              <MenuItem value='desk'>책상</MenuItem>
              <MenuItem value='bed'>침대</MenuItem>
              <MenuItem value='chair'>의자</MenuItem>
              <MenuItem value='sofa'>소파</MenuItem>
            </Select>
            {/* <label>상품 카테고리</label>
            <select name='category'>
              <option value='none'>=== 선택 ===</option>
              <option value='table'>책상</option>
              <option value='bed'>침대</option>
              <option value='chair'>의자</option>
              <option value='sofa'>소파</option>
            </select> */}
          </div>
          <div className='uploadBtn'>
            <Button type='submit' variant='contained' color='primary'>
              상품등록
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
}
