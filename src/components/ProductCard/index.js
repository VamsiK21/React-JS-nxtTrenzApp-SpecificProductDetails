import {withRouter, Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  const onClickProductItem = () => {
    const {history} = props
    history.replace(`/products/${id}`)
  }

  return (
    //   Wrap with Link from react-router-dom
    <Link to={`/products/${id}`} className="link-items">
      <li className="product-item" onClick={onClickProductItem}>
        <img src={imageUrl} alt="product" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">by {brand}</p>
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
          <div className="rating-container">
            <p className="rating">{rating}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
              className="star"
            />
          </div>
        </div>
      </li>
    </Link>
  )
}
export default withRouter(ProductCard)
