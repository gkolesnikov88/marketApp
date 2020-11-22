import './categoriesNavigation.css';
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../loader/Loader";
import {deleteCategoryById, fetchCategories} from "../../store/actions/categories";
import {useContext, useEffect} from "react";
import {fetchGoods, fetchGoodsByCategories} from "../../store/actions/good";
import GoodsPageContext from "../../pages/GoodsPage/GoodsPageContext";

export const CategoriesNavigation = () => {

  // context
  const {modalOptions, setModalOptions} = useContext(GoodsPageContext);

  // redux
  const categoriesList = useSelector(state => state.categories.categoriesList);
  const categoriesLoading = useSelector(state => state.categories.categoriesLoading);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  // actions
  const onClickCategories = (catid) => {
    dispatch(fetchGoodsByCategories(catid));
  }
  const onClickDeleteCategories = (catid) => {
    setModalOptions({
      ...modalOptions,
      showModal: true,
      header: 'Delete confirmation',
      elements: { question: {
          type: 'text', text: 'Do you want to delete this category?'
        }},
      buttons: [
        {
          className: 'btn-danger',
          title: 'Delete',
          action: () => { dispatch(deleteCategoryById(catid, token)) }
        }
      ]
    })
  }
  const onClickCategoriesAll = () => {
    dispatch(fetchGoods());
  }

  return (
    <ul className="nav flex-column">
      {
        categoriesLoading ?
          <li> <Loader/> </li> :
          <>
            {
              categoriesList.map(category => (
                <li className="nav-item d-flex align-items-center" key={category._id}>
                  <i className="fas fa-trash-alt delete-icon"
                    data-catid={category._id}
                    onClick={(event) => onClickDeleteCategories(event.target.dataset.catid)}
                  ></i>
                  <div
                    className="nav-link category-link"
                    data-catid={category._id}
                    onClick={(event) => onClickCategories(event.target.dataset.catid)}
                  >{category.name}</div>
                </li>
              ))
            }
            <li className="nav-item" key="withoutCat">
              <div
                className="nav-link category-link"
                onClick={(event) => onClickCategories(null)}
              >Without category</div>
            </li>
            <li className="nav-item" key="allCat">
              <div
                className="nav-link category-link"
                onClick={(event) => onClickCategoriesAll()}
              >All</div>
            </li>
          </>
      }
    </ul>
  )
}
