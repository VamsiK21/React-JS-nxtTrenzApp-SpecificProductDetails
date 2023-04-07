// Write your code here

import './index.css'

const SimilarProductItem = props => {
  const {SimilarProductDetails} = props
  const {imageUrl, title, brand, price, rating} = SimilarProductDetails

  return (
    <li className="product-item-container">
      <img
        src={imageUrl}
        className="similar-image"
        alt={`similar product ${title}`}
      />
      <p className="product-title-text">{title}</p>
      <p className="product-brand">by {brand}</p>

      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {price}/- </p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating-text">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="star-img"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
