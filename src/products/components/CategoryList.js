import React, { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';
import {
  Container,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  TextField,
} from '@material-ui/core';

import '../pages/Category.css';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';
import { addComment } from '../../shared/util/rating';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function CategoryList(props) {
  const { currentUser } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (currentUser) {
      dbService
        .collection('users')
        .where('userId', '==', currentUser.uid)
        .limit(1)
        .get()
        .then((data) => {
          setUser(data.docs[0].data());
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchTermHandler = (e) => {
    setSearchTerm(e.target.value);
    props.onSearchFilter(e.target.value);
  };

  const handleChange = (event) => {
    props.categorySelectHandler(event.target.value);
    setSelectedCategory(event.target.value);
  };
  const onSubmitComment = (productId, productName, value, comment) => {
    addComment(
      productId,
      productName,
      user.nickName,
      value,
      comment,
      user.imageUrl
    );
  };

  return (
    <Container maxWidth='lg'>
      <section
        className='category'
        style={props.filterProducts.length > 0 ? null : { height: '150vh' }}
      >
        <div className='category__main'>
          <div className='main__img'>
            <img src='image/main.jpg' alt='category-main-img' />
          </div>
        </div>
        <ul className='category__list'>
          <li
            className='list-item'
            onClick={() => {
              props.categorySelectHandler('all');
            }}
          >
            <div className='menu-img'>
              <img
                src={process.env.PUBLIC_URL + `/image/menu-img/all.jpg`}
                alt=''
              />
            </div>
            <p>ALL</p>
          </li>
          <li
            className='list-item'
            onClick={() => {
              props.categorySelectHandler('sofa');
            }}
          >
            <div className='menu-img'>
              <img
                src={process.env.PUBLIC_URL + `/image/menu-img/sofa.jpg`}
                alt=''
              />
            </div>
            <p>SOFA</p>
          </li>
          <li
            className='list-item'
            onClick={() => {
              props.categorySelectHandler('bed');
            }}
          >
            <div className='menu-img'>
              <img
                src={process.env.PUBLIC_URL + `/image/menu-img/bed.jpg`}
                alt=''
              />
            </div>
            <p>BED</p>
          </li>

          <li
            className='list-item'
            onClick={() => {
              props.categorySelectHandler('chair');
            }}
          >
            <div className='menu-img'>
              <img
                src={process.env.PUBLIC_URL + `/image/menu-img/chair.jpg`}
                alt=''
              />
            </div>
            <p>CHIAR</p>
          </li>
          <li
            className='list-item'
            onClick={() => {
              props.categorySelectHandler('desk');
            }}
          >
            <div className='menu-img'>
              <img
                src={process.env.PUBLIC_URL + `/image/menu-img/desk.jpg`}
                alt=''
              />
            </div>
            <p>DESK</p>
          </li>
        </ul>

        <Container maxWidth='lg'>
          <div className='selectInput'>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              size='small'
            >
              <InputLabel htmlFor='outlined-age-native-simple'>
                Category
              </InputLabel>
              <Select
                native
                value={selectedCategory}
                onChange={handleChange}
                label='category'
                inputProps={{
                  name: 'category',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='' />
                <option value={'all'}>ALL</option>
                <option value={'sofa'}>SOFA</option>
                <option value={'bed'}>BED</option>
                <option value={'chair'}>CHAIR</option>
                <option value={'desk'}>DESK</option>
              </Select>
            </FormControl>
          </div>
          <div className='category__list-header'>
            <h1 className='category__title'>{props.selecteCategory}</h1>

            <ul className='category__filter'>
              <li
                className='filter-item'
                onClick={() => {
                  props.productFilter('desc');
                }}
              >
                낮은가격순
              </li>
              <li
                className='filter-item'
                onClick={() => {
                  props.productFilter('asce');
                }}
              >
                높은가격순
              </li>
              <li
                className='filter-item'
                onClick={() => {
                  props.productFilter('register');
                }}
              >
                최근제품순
              </li>
            </ul>
          </div>
          <div className='search'>
            <TextField
              id='standard-basic'
              label='검색어'
              onChange={searchTermHandler}
              value={searchTerm}
            />
          </div>

          {props.filterProducts.length > 0 ? (
            <ul className='category-list'>
              {props.filterProducts &&
                props.filterProducts.map((product) => (
                  <CategoryItem
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.imageUrl}
                    category={product.category}
                    avgRating={product.avgRating}
                    reviewCount={product.scoreCount}
                    addComment={onSubmitComment}
                  />
                ))}
            </ul>
          ) : (
            <h1 className='no-result' style={{ height: '100vh' }}>
              검색결과가 없습니다.
            </h1>
          )}
        </Container>
      </section>
    </Container>
  );
}
