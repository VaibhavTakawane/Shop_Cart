import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-content">

          <div>
            <h5>ShopCart</h5>
            <p>
              Simple shopping. Great products.
            </p>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} ShopCart
          </div>

        </div>
      </Container>
    </footer>
  );
}

export default Footer;