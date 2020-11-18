import * as types from './actionsType';

export function fetchGoods() {
  return async (dispatch) => {
    dispatch(fetchGoodsStart());

    try {
      const response = await fetch('/api/goods');
      const data = await response.json();
      const goods = data.map((item, index) => {
        return {...item, id: index + 1}
      })
      dispatch(fetchGoodsSuccess(goods));

    } catch (e) {

    }
  }
}
export function fetchGoodsStart() {
  return {
    type: types.goods.FETCH_GOODS_START
  }
}
export function fetchGoodsSuccess(goods) {
  return {
    type: types.goods.FETCH_GOODS_SUCCESS,
    newGoods: goods
  }
}

export function fetchGoodsByCategories(catId) {
  return async (dispatch) => {
    dispatch(fetchGoodsStart());

    try {
      const response = await fetch(`/api/goods/inCategory/${catId}`);
      const data = await response.json();
      const goods = data.map((item, index) => {
        return {...item, id: index + 1}
      })
      dispatch(fetchGoodsSuccess(goods));

    } catch (e) {

    }
  }
}

export function deleteById(goodsId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/goods/${goodsId}`, {
        method: 'DELETE',
      });
      // const data = await response.json();

      dispatch(fetchGoods());

    } catch (e) {

    }
  }
}

export function saveById(newGood) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/goods', {
        method: 'PUT',
        body: JSON.stringify(newGood),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();

      dispatch(fetchGoods());

    } catch (e) {

    }
  }
}
export function saveByIdAction(newGoods) {
  return {
    type: types.goods.SAVE_BY_ID,
    newGoods
  }
}

export function createGood(newGood) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/goods', {
        method: 'POST',
        body: JSON.stringify(newGood),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();

      dispatch(fetchGoods());

    } catch (e) {

    }
  }
}
export function createGoodAction(newGoods, newId) {
  return {
    type: types.goods.CREATE_GOOD,
    newGoods,
    newId
  }
}