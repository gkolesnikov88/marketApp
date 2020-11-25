import {NavLink} from "react-router-dom";
import './header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-menu container">
        <NavLink to="/" className="header__logo logo" aria-label="3D Store logo">3D Store</NavLink>
        <nav className="header__navigation navigation">
          <div className="navigation__content">
            <ul className="navigation__list">
              <li className="navigation__item"><NavLink to="/">Catalog</NavLink></li>
              <li className="navigation__item"><NavLink to="/">About Us</NavLink></li>
              <li className="navigation__item"><NavLink to="/">Contacts</NavLink></li>
            </ul>
          </div>
        </nav>
        <ul className="header__actions user-actions">
          <li className="user-action__items">
            <NavLink to="/">User login</NavLink>
          </li>
          <li className="user-action__items">
            <NavLink to="/auth">Admin login</NavLink>
          </li>
        </ul>
      </div>
    </header>

  )
}
