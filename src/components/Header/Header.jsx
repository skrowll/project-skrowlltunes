import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import styles from './Header.module.css';
import logo from '../../assets/logo-skrowlltunes.svg';

function Header() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [loadingName, setLoadingName] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(async () => {
    setLoadingName(true);
    const user = await getUser();
    setUsername(user.username);
    setLoadingName(false);
  }, []);

  const logout = async () => {
    setLoadingLogout(true);
    await updateUser({
      _id: '',
      username: '',
      email: '',
      role: '',
    });
    setLoadingLogout(false);
    navigate('/login');
  };

  const menuShow = () => {
    const menuMobile = document.querySelector(`.${styles.menuMobile}`);
    if (menuMobile.classList.contains(`${styles.open}`)) {
      menuMobile.classList.remove(`${styles.open}`);
    } else {
      menuMobile.classList.add(`${styles.open}`);
    }
  };

  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.logoContainer }>
        <img src={ logo } alt="logo" />
        <h1>SkrowllTunes</h1>
      </div>
      <nav className={ styles.headerNavigation }>
        <ul>
          <li>
            <Link to="/search">Pesquisa</Link>
          </li>
          <li>
            <Link to="/favorites">Favoritas</Link>
          </li>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        </ul>
      </nav>
      <div className={ styles.profileContainer }>
        <div className={ styles.usernameContainer }>
          {loadingName
            ? <span className={ styles.usernameText }><Loading size="2" /></span>
            : <span className={ styles.usernameText }>{username}</span>}
        </div>
        <span className="material-symbols-outlined">person_filled</span>
        <button
          type="button"
          className={ styles.logoutButton }
          onClick={ logout }
        >
          {
            loadingLogout
              ? (<Loading size="1.5" />)
              : (<span className="material-symbols-outlined">logout</span>)
          }
        </button>
      </div>
      <div className={ styles.buttonMenuMobile }>
        <button
          type="button"
          onClick={ menuShow }
        >
          <i className="material-symbols-outlined">menu</i>
        </button>
      </div>
      <div className={ styles.menuMobile }>
        <div className={ styles.profileContainerMobile }>
          <span className={ styles.usernameTextMobile }>{username}</span>
          <i className="material-symbols-outlined">person_filled</i>
        </div>
        <ul>
          <li>
            <Link to="/search">Pesquisa</Link>
          </li>
          <li>
            <Link to="/favorites">Favoritas</Link>
          </li>
          <li>
            <Link to="/profile">Perfil</Link>
          </li>
        </ul>
        <button
          type="button"
          className={ styles.logoutButtonMobile }
          onClick={ logout }
        >
          {
            loadingLogout
              ? (<Loading size="1.5" />)
              : (
                <span>
                  Sair
                  <i className="material-symbols-outlined">logout</i>
                </span>
              )
          }
        </button>
      </div>
    </header>
  );
}

export default Header;
