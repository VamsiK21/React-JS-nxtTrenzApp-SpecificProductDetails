// Write your code here
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productDetails: {},
    similarProductsData: [],
    count: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getUpdatedData = data => ({
    id: data.id,
    imageUrl: data.image_url,
    title: data.title,
    price: data.price,
    description: data.description,
    brand: data.brand,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getUpdatedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        eachItem => this.getUpdatedData(eachItem),
      )

      console.log(updatedData)
      this.setState({
        productDetails: updatedData,
        similarProductsData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickPlusIcon = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onClickMinusIcon = () => {
    const {count} = this.state

    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  onClickContinueBtn = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderProductDetailsView = () => {
    const {productDetails, count, similarProductsData} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = productDetails

    return (
      <div className="details-success-view">
        <div className="product-details-section">
          <img src={imageUrl} alt="product" className="product-detail-image" />

          <div className="product-content-container">
            <h1 className="product-details-heading">{title}</h1>
            <p className="product-details-price">Rs {price}/- </p>

            <div className="rating-review-container">
              <div className="rating-container">
                <p className="product-details-rating">{rating}</p>
                <img
                  className="product-details-star"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="product-details-reviews">
                {totalReviews}
                <span> Reviews</span>
              </p>
            </div>

            <p className="product-details-description">{description}</p>
            <div className="avail-container">
              <p className="availability-text">Avaliable: </p>
              <p className="avaliability-status-text">{availability}</p>
            </div>

            <div className="avail-container">
              <p className="availability-text">Brand: </p>
              <p className="avaliability-status-text">{brand}</p>
            </div>
            <hr className="hr-line" />

            <div className="btn-count-container">
              <button
                className="icon-btn"
                onClick={this.onClickMinusIcon}
                type="button"
                data-testid="minus"
              >
                <BsDashSquare className="dash-icon" />
              </button>
              <p className="count-number-text">{count}</p>
              <button
                className="icon-btn"
                onClick={this.onClickPlusIcon}
                type="button"
                data-testid="plus"
              >
                <BsPlusSquare className="dash-icon" />
              </button>
            </div>

            <button type="button" className="add-button">
              ADD TO CART
            </button>
          </div>
        </div>

        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="list-container">
          {similarProductsData.map(eachItem => (
            <SimilarProductItem
              SimilarProductDetails={eachItem}
              key={eachItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-secton">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-image"
        alt="failure view"
      />
      <h1 className="failure-text">Product Not Found</h1>
      <Link to="/products">
        <button
          className="continue-btn"
          type="button"
          onClick={this.onClickContinueBtn}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderAllProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderAllProductDetails()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
