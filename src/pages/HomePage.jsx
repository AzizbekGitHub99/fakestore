import { Component } from "react";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import Loading from "../components/loading/Loading";

import img1 from "../assets/images/circuit.png";
import img2 from "../assets/images/jewellery.svg";
import img3 from "../assets/images/dress.png";
import img4 from "../assets/images/clothes-hanger.png";
import ProductCard from "../components/product-card/ProductCard";

class HomePage extends Component {
  state = {
    product: [],
    loading: false,
  };
  componentDidMount() {
    this.getProducts();
  }

  async getProducts(search = "") {
    try {
      this.setState({ loading: true });
      let { data } = await axios("https://fakestoreapi.com/products", {
        params: { sort: search },
      });
      this.setState({ product: data });
    } catch (err) {
      toast.error("Error!");
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { product, loading } = this.state;
    return (
      <Container>
        <div className="category__card__rows">
          <Link to={"/electronics"} className="category__card">
            <div className="category__card-img">
              <img src={img1} alt="electronics" />
            </div>
            <div className="category__card-title">Electronics</div>
          </Link>
          <Link to={"/electronics"} className="category__card">
            <div className="category__card-img">
              <img src={img2} alt="electronics" />
            </div>
            <div className="category__card-title">Jewelery</div>
          </Link>
          <Link to={"/electronics"} className="category__card">
            <div className="category__card-img">
              <img src={img3} alt="electronics" />
            </div>
            <div className="category__card-title">Women's clothing</div>
          </Link>
          <Link to={"/electronics"} className="category__card">
            <div className="category__card-img">
              <img src={img4} alt="electronics" />
            </div>
            <div className="category__card-title">Men's clothing</div>
          </Link>
          
        </div>
        <h1>All Products {product.length}</h1>
        <div className="product__cards__row">
          {loading ? (
            <Loading />
          ) : (
            product.map((el) => <ProductCard key={el.id} {...el} />)
          )}
        </div>
      </Container>
    );
  }
}

export default HomePage;
