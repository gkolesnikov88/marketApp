import * as types from './actionsType';

export function fetchGoods() {
  return async (dispatch) => {
    dispatch(fetchGoodsByCategories());
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
      let url = '/api/goods';
      if (catId !== undefined) {
        url = `/api/goods/inCategory/${catId}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      const goods = data.map((item, index) => {
        return {...item, id: index + 1}
      })
      dispatch(fetchGoodsSuccess(goods));

    } catch (e) {

    }
  }
}

export function deleteById(goodsId, token) {
  return async (dispatch) => {
    try {
      await fetch(`/api/goods/${goodsId}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
      });

      dispatch(fetchGoods());

    } catch (e) {

    }
  }
}

export function saveById(newGood, token) {
  return async (dispatch) => {
    try {
      await fetch('/api/goods', {
        method: 'PUT',
        body: JSON.stringify(newGood),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

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

export function createGood(newGood, token) {
  return async (dispatch) => {
    try {
      await fetch('/api/goods', {
        method: 'POST',
        body: JSON.stringify(newGood),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

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