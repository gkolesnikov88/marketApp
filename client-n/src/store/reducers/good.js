import * as types from '../actions/actionsType';

const initialState = {
  goodsList: [
    // {
    //   id: 1,
    //   name: 'Test 1',
    //   purchasePrice: 150,
    //   sellingPrice: 250
    // },
    // {
    //   id: 2,
    //   name: 'Test 2',
    //   purchasePrice: 220,
    //   sellingPrice: 330
    // },
    // {
    //   id: 3,
    //   name: 'Test 3',
    //   purchasePrice: 290,
    //   sellingPrice: 930
    // },
  ],
  newId: 4,
  goodsLoading: false,
}

export default function goodReducer(state = initialState, action) {
  switch (action.type) {
    case types.goods.DELETE_BY_ID:
      return {
        ...state, goodsList: action.newGoods
      }
    case types.goods.SAVE_BY_ID:
      return {
        ...state, goodsList: action.newGoods
      }
      case types.goods.CREATE_GOOD:
      return {
        ...state, goodsList: action.newGoods, newId: action.newId
      }
    case types.goods.FETCH_GOODS_START:
      return {
        ...state, goodsLoading: true
      }
    case types.goods.FETCH_GOODS_SUCCESS:
      return {
        ...state, goodsLoading: false, goodsList: action.newGoods
      }
    default:
      return state
  }
}

