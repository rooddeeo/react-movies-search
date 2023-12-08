import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <nav className={css.headerNav}>
        <ul className={css.headerList}>
          <li className={css.headerListItem}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={css.headerListItem}>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
