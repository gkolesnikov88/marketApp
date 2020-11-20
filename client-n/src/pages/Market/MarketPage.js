import {NavLink} from "react-router-dom";

export const MarketPage = () => {
  return (
    <div>
      <span className='mr-5'>General User Market Page</span>
      <NavLink to="/auth">Admin login</NavLink>
    </div>
  )
}
