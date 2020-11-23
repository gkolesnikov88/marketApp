import * as types from './actionsType';
import is from 'is_js';

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
      const goods = await returnGoodsInCategory(catId);
      dispatch(fetchGoodsSuccess(goods));

    } catch (e) {

    }
  }
}
export async function returnGoodsInCategory(catId) {
  let url = '/api/goods';
  if (!is.undefined(catId)) {
    url = `/api/goods/inCategory/${catId}`;
  }
  const response = await fetch(url);
  const goods = await response.json();
  return goods;
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

export async function changeGoodsCategoryTo(catId, token) {
  return await fetch('/api/goods/changeCategory', {
    method: 'POST',
    body: JSON.stringify({
      catId
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}
