import './GoodsNavigation.css';
import GoodsPageContext from "../../pages/GoodsPage/GoodsPageContext";
import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createGood} from "../../store/actions/good";
import {createCategory} from "../../store/actions/categories";


export const GoodsNavigation = () => {

  // redux
  const dispatch = useDispatch();
  const categoriesList = useSelector(state => state.categories.categoriesList);

  // context
  const {modalOptions, setModalOptions} = useContext(GoodsPageContext);

  // actions
  const onAddGood = () => {
    setModalOptions({
      ...modalOptions,
      showModal: true,
      header: 'New good',
      elements: {
        name: {
          type: 'input', text: 'Title', value: '', id: 'title',
          onChange: (modalOptionsFromModal, value) => onInputChange(modalOptionsFromModal,'name', value)
        },
        purchase: {
          type: 'input', text: 'Purchase', value: '', id: 'purchase',
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'purchase', value)
        },
        sell:{
          type: 'input', text: 'Sell', value: '', id: 'sell',
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'sell', value)
        },
        category:{
          type: 'select', text: 'Category', value: '', id: 'category', selectedId: null,
          selectOptions: categoriesList.slice(),
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'category', value)
        }},
      buttons: [
        {
          className: 'btn-primary',
          title: 'Create',
          action: (modalOptionsFromModal) => { onCreateGood(modalOptionsFromModal) }
        }
      ]
    })
  }

  const onAddCategory = () => {
    setModalOptions({
      ...modalOptions,
      showModal: true,
      header: 'New category',
      elements: {
        name: {
          type: 'input', text: 'Title', value: '', id: 'title',
          onChange: (modalOptionsFromModal, value) => onInputChange(modalOptionsFromModal,'name', value)
        }},
      buttons: [
        {
          className: 'btn-primary',
          title: 'Create',
          action: (modalOptionsFromModal) => { onCreateCategory(modalOptionsFromModal) }
        }
      ]
    })
  }

  const onInputChange = (modalOptionsFromModal, inputName, inputValue) => {
    const newElements = {...modalOptionsFromModal.elements};
    newElements[inputName].value = inputValue;
    setModalOptions({
      ...modalOptionsFromModal,
      elements: newElements
    })
  }

  const onCreateGood = (modalOptionsFromModal) => {
    dispatch(createGood({
      name: modalOptionsFromModal.elements.name.value,
      purchase: modalOptionsFromModal.elements.purchase.value,
      sell: modalOptionsFromModal.elements.sell.value,
      category: modalOptionsFromModal.elements.category.value
    }))
  }

  const onCreateCategory = (modalOptionsFromModal) => {
    dispatch(createCategory({
      name: modalOptionsFromModal.elements.name.value,
    }))
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item nav-button mr-2">
            <div className="nav-link nav-content" onClick={ onAddCategory }>Add category</div>
          </li>
          <li className="nav-item nav-button">
            <div className="nav-link nav-content" onClick={ onAddGood }>Add good</div>
          </li>
        </ul>
      </div>
    </nav>
  )
}