import { Container, Divider, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import { FaBed, FaChair, FaRegLightbulb } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import InputLabel from "@material-ui/core/InputLabel";

import "./Category.css";

export default function Category() {
  const [priceFilter, setPriceFilter] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  console.log(priceFilter);
  return (
    <section className="category">
      <div className="category__main">
        <div className="main__img">
          <img
            src="https://www.ikea.com/images/2a/3a/2a3a47ebc79a314d0b535ed0c2bab475.jpg?f=l"
            alt="category-main-img"
          />
        </div>
      </div>
      <ul className="category__list">
        <Divider orientation="vertical" flexItem />

        <li className="list-item">
          <span>
            <GiSofa size={40} />
          </span>
          <p>SOFA</p>
        </li>
        <Divider orientation="vertical" flexItem />
        <li className="list-item">
          <span>
            <FaBed size={40} />
          </span>
          <p>BED</p>
        </li>
        <Divider orientation="vertical" flexItem />

        <li className="list-item">
          <span>
            <FaChair size={40} />
          </span>
          <p>CHIAR</p>
        </li>
        <Divider orientation="vertical" flexItem />
        <li className="list-item">
          <span>
            <FaRegLightbulb size={40} />
          </span>
          <p>LIGHT</p>
        </li>
        <Divider orientation="vertical" flexItem />
        <Divider orientation="vertical" flexItem />
      </ul>
      <Container maxWidth="lg">
        <div className="category__list-header">
          <h1 className="category__title">SOFA</h1>
          <ul className="category__filter">
            <li className="filter-item">
              <InputLabel id="demo-simple-select-label">가격</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceFilter}
                onChange={handleChange}
                style={{ width: "150px" }}
              >
                <MenuItem value={"desc"}>낮은가격순</MenuItem>
                <MenuItem value={"asce"}>높은가격순</MenuItem>
              </Select>
            </li>
            <li className="filter-item">
              <InputLabel id="demo-simple-select-label">등록순</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceFilter}
                onChange={handleChange}
                style={{ width: "150px" }}
              >
                <MenuItem value={"desc"}>최근등록순</MenuItem>
              </Select>
            </li>
            <li className="filter-item">
              <InputLabel id="demo-simple-select-label">인기순</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={priceFilter}
                onChange={handleChange}
                style={{ width: "150px" }}
              >
                <MenuItem value={"desc"}>최근등록순</MenuItem>
              </Select>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
