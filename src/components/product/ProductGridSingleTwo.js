import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";

const ProductGridSingleTwo = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass,
  colorClass,
  titlePriceClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate);

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ""}`}>
        <div className={`product-wrap-2 ${spaceBottomClass ? spaceBottomClass : ""} ${colorClass ? colorClass : ""} `}>
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              <img className="default-img" src={process.env.PUBLIC_URL + product.image[0]} alt="" />
              {product.image.length > 1 ? (
                <img className="hover-img" src={process.env.PUBLIC_URL + product.image[1]} alt="" />
              ) : (
                ""
              )}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span className="pink">-{product.discount}%</span> : ""}
                {product.new ? <span className="purple">New</span> : ""}
              </div>
            ) : (
              ""
            )}

            <div className="product-action-2">
              {product.affiliateLink ? (
                <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank" title="Buy now">
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`} title="Select options">
                  <i className="fa fa-cog"></i>
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => addToCart(product, addToast)}
                  className={cartItem !== undefined && cartItem.quantity > 0 ? "active" : ""}
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={cartItem !== undefined ? "Đã thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}
                >
                  {" "}
                  <i className="fa fa-shopping-cart"></i>{" "}
                </button>
              ) : (
                <button disabled className="active" title="Hết hàng">
                  <i className="fa fa-shopping-cart"></i>
                </button>
              )}

              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>

              <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={compareItem !== undefined ? "Đã thêm vào mục so sánh" : "Thêm vào mục so sánh"}
                onClick={() => addToCompare(product, addToast)}
              >
                <i className="fa fa-retweet"></i>
              </button>
            </div>
          </div>
          <div className="product-content-2">
            <div className={`title-price-wrap-2 ${titlePriceClass ? titlePriceClass : ""}`}>
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>{product.name}</Link>
              </h3>
              <div className="price-2">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencyName === "VND"
                        ? finalDiscountedPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                          currency.currencySymbol
                        : currency.currencySymbol +
                          finalDiscountedPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>{" "}
                    <span className="old">
                      {currency.currencyName === "VND"
                        ? finalProductPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                        : currency.currencySymbol + finalProductPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </Fragment>
                ) : (
                  <span>
                    {currency.currencyName === "VND"
                      ? finalProductPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + currency.currencySymbol
                      : currency.currencySymbol + finalProductPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                )}
              </div>
            </div>
            <div className="pro-wishlist-2">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={wishlistItem !== undefined ? "Added to wishlist" : "Add to wishlist"}
                onClick={() => addToWishlist(product, addToast)}
              >
                <i className="fa fa-heart-o" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridSingleTwo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridSingleTwo;
