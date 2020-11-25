import {GoodItem} from "./GoodsItem/GoodItem";
import {useDispatch, useSelector} from "react-redux";
import {deleteById, fetchGoods, saveById} from "../../store/actions/good";
import GoodsPageContext from "../../pages/GoodsPage/GoodsPageContext";
import {useContext, useEffect} from "react";
import {Loader} from "../loader/Loader";

export const GoodsList = () => {

  // redux
  const goodsList = useSelector(state => state.good.goodsList);
  const goodsLoading = useSelector(state => state.good.goodsLoading);
  const categoriesList = useSelector(state => state.categories.categoriesList);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoods());
  }, [dispatch])

  // context
  const {modalOptions, setModalOptions} = useContext(GoodsPageContext);

  // actions
  const onDeleteById = (item) => {
    setModalOptions({
      ...modalOptions,
      showModal: true,
      header: 'Delete confirmation',
      elements: { question: {
        type: 'text', text: 'Do you want to delete?'
      }},
      buttons: [
        {
          className: 'btn-danger',
          title: 'Delete',
          action: () => { dispatch(deleteById(item._id, token)) }
        }
      ]
    })
  }

  const onChangeById = (item) => {
    const categoryByDefault = 'Without category';
    setModalOptions({
      ...modalOptions,
      showModal: true,
      header: 'Edit ' + item.name,
      elements: {
        name: {
          type: 'input', text: 'Title', value: item.name, id: 'title',
          onChange: (modalOptionsFromModal, value) => onInputChange(modalOptionsFromModal,'name', value)
        },
        purchase: {
          type: 'input', text: 'Purchase', value: item.purchasePrice, id: 'purchase',
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'purchase', value)
        },
        sell:{
          type: 'input', text: 'Sell', value: item.sellingPrice, id: 'sell',
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'sell', value)
        },
        category:{
          type: 'select', text: 'Category', value: item.category || categoryByDefault, id: 'category', selectedId: item.category,
          selectOptions: categoriesList.slice(),
          onChange: (modalOptionsFromModal,value) => onInputChange(modalOptionsFromModal,'category', value)
        },
        urlImg: {
          type: 'input', text: 'Image url', value: item.urlImg || '', id: 'urlImg',
          onChange: (modalOptionsFromModal, value) => onInputChange(modalOptionsFromModal,'urlImg', value)
        }},
      buttons: [
        {
          className: 'btn-primary',
          title: 'Save',
          action: (modalOptionsFromModal) => { onSaveById(modalOptionsFromModal, item._id, token) }
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

  const onSaveById = (modalOptionsFromModal, itemId, token) => {
    dispatch(saveById({
      _id: itemId,
      name: modalOptionsFromModal.elements.name.value,
      purchase: modalOptionsFromModal.elements.purchase.value,
      sell: modalOptionsFromModal.elements.sell.value,
      category: modalOptionsFromModal.elements.category.value,
      urlImg: modalOptionsFromModal.elements.urlImg.value,
    }, token));
  }

  return (
    <table className="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Purchase</th>
        <th scope="col">Sell</th>
        <th scope="col" className='text-center'>Action</th>
      </tr>
      </thead>
      <tbody>
      { goodsLoading ?
        <tr><td className='d-flex'><Loader/></td></tr>:
        goodsList.map((item) => {
          return (
            <GoodItem
              key={item._id}
              item={item}
              onDeleteById={onDeleteById}
              onChangeById={onChangeById}
            />
          )
        })
      }
      </tbody>
    </table>
  )
}
