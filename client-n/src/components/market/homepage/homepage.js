import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../../loader/Loader";
import {fetchCategories} from "../../../store/actions/categories";
import {useEffect} from "react";
import './homepage.css';
import {MarketGoodItem} from "../marketGoodItem/marketGoodItem";
import {fetchGoods, fetchGoodsByCategories} from "../../../store/actions/good";

export const Homepage = () => {

  // redux
  const categoriesList = useSelector(state => state.categories.categoriesList);
  const categoriesLoading = useSelector(state => state.categories.categoriesLoading);
  const goodsList = useSelector(state => state.good.goodsList);
  const goodsLoading = useSelector(state => state.good.goodsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGoods());
  }, [dispatch])

  // actions
  const onClickCategories = (catid) => {
    console.log(catid)
    dispatch(fetchGoodsByCategories(catid));
  }

  const onClickCategoriesAll = () => {
    dispatch(fetchGoods());
  }

  return (
    <div className="container">
      <div className="homepage-top-grid">
        <div className="homepage-top-grid__menu">
          <div className="menu-desktop">
            {
              categoriesLoading ?
                <li> <Loader/> </li> :
                <>
                  {
                    categoriesList.map(category => {
                      return (
                        <div key={category._id} className="menu-desktop__root">
                          <i className="fas fa-asterisk orange-icon menu-desktop__root-icon"></i>
                          <div className="menu-desktop__root-info"
                               data-catid={category._id}
                               onClick={(event) => onClickCategories(event.target.dataset.catid)}
                          >
                            <div data-catid={category._id}>{category.name}</div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="menu-desktop__root" key="withoutCat">
                    <div className="menu-desktop__root-info"
                         onClick={(event) => onClickCategories(null)}>
                      <div>Without category</div>
                    </div>
                  </div>
                  <div className="menu-desktop__root" key="allCat">
                    <div className="menu-desktop__root-info"
                         onClick={(event) => onClickCategoriesAll()}>
                      <div>All</div>
                    </div>
                  </div>
                </>
            }

          </div>
        </div>
        <div className="homepage-top-grid__center">
          { goodsLoading ?
            <Loader/> :
            goodsList.map((item) => {
              return (
                <MarketGoodItem
                  key={item._id}
                  item={item}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
