import './marketGoodItem.css';
import {NavLink} from "react-router-dom";

export const MarketGoodItem = ({item}) => {
  return (
    <div className="catalog-item">
      <div className="n-catalog-product">
        <div className="n-catalog-product__main">
          <div className="n-catalog-product__info">
            <div className="product-info">
              <div className="product-info__image">
                {
                  item.urlImg &&
                  (
                    <>
                      <a href={`#img${ item._id }`}>
                      <img src={ item.urlImg } alt={ item.name }/>
                      </a>
                      <a href="#none" className="lightbox" id={`img${ item._id }`}>
                      <span style={{backgroundImage: `url(${ item.urlImg })` }}></span>
                      </a>
                    </>
                  )
                }
              </div>

              <div className="product-info__title">
                <div className="product-info__title-link">
                  <NavLink to="/">{ item.name }</NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="n-catalog-product__price">
            { `${item.sellingPrice} $` }
          </div>
          <div className="n-catalog-product__buttons">
            <button className="buy-btn">
              Buy
            </button>
          </div>
        </div>
        <div className="n-catalog-product__footer">

        </div>
      </div>
    </div>
  )
}