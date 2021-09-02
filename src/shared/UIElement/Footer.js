import { Container } from "@material-ui/core";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css";
export default function Footer() {
  return (
    <>
      <Container maxWidth="lg" style={{ backgroundColor: "f5f5f5" }}>
        <footer className="footer">
          <div className="footer_inner">
            <ul className="footer__icons">
              <li className="icon-item">
                <FaInstagram className="icon" />
              </li>
              <li className="icon-item">
                <FaTwitter className="icon" />
              </li>
              <li className="icon-item">
                <FaFacebookSquare className="icon" />
              </li>
              <li className="icon-item">
                <FaYoutube className="icon" />
              </li>
            </ul>
            <ul className="footer__menu">
              <li className="menu-item">Home</li>
              <li className="menu-item">Services</li>
              <li className="menu-item">About</li>
              <li className="menu-item">Terms</li>
              <li className="menu-item">Privacy Policy</li>
            </ul>
            <div className="footer__name">
              <p>Company FUTURELIFE c 2021</p>
            </div>
          </div>
        </footer>
      </Container>
    </>
  );
}
