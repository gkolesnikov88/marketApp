import './GoodsPage.css';
import {GoodsList} from "../../components/goodsList/GoodsList";
import {GoodsNavigation} from "../../components/goodsNavigation/goodsNavigation";
import {CategoriesNavigation} from "../../components/categoriesNavigation/categoriesNavigation";

export const GoodsPage = () => {

  return (
    <>
      <GoodsNavigation/>
      <div className='d-flex'>
        <div className='col-sm-2'>
          <CategoriesNavigation/>
        </div>
        <div className='col-sm-10'>
          <GoodsList/>
        </div>
      </div>
    </>
  )
}
