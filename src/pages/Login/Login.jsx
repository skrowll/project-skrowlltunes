import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { readUser, login } from '../../services/userAPI';
import Loading from '../../components/Loading';
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);

  const MIN_USERNAME_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;
  const disabled = (
    username.length < MIN_USERNAME_LENGTH || password.length < MIN_PASSWORD_LENGTH
  );

  const alreadyLogged = () => {
    const loggedUser = readUser();
    if (loggedUser?.username) {
      navigate('/search');
    }
  };

  useEffect(() => {
    alreadyLogged();
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const statusCode = {
      NOTFOUND: 404,
      UNAUTHORIZED: 401,
      OK: 200,
    };
    const result = await login({ username, password });
    if (result === statusCode.NOTFOUND) {
      setWarning('404');
      setLoading(false);
    }
    if (result === statusCode.UNAUTHORIZED) {
      setLoading(false);
      setWarning('401');
    }
    if (result === statusCode.OK) {
      setLoading(false);
      navigate('/search');
    }
  };

  const handleGuestClick = async () => {
    setLoading(true);
    await login({
      username: 'Convidado',
      password: '@Guest',
    });
    setLoading(false);
    navigate('/search');
  };

  const loginButton = document.querySelector('.loginButton');
  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      loginButton?.click();
    }
  });

  return (
    <div className={ styles.pageLogin }>
      <section className={ styles.loginContainer }>
        <h1>Login</h1>
        <form autoComplete="off">
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              onChange={ (event) => {
                setWarning('');
                setUsername(event.target.value);
              } }
              value={ username }
            />
          </label>
          {
            warning === '404'
              && (
                <span>
                  <p className={ styles.warning }>Usuário não encontrado</p>
                </span>
              )
          }
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={ (event) => {
                setWarning('');
                setPassword(event.target.value);
              } }
              value={ password }
            />
          </label>
          {
            warning === '401'
              && (
                <span>
                  <p className={ styles.warning }>Senha incorreta</p>
                </span>
              )
          }
          {
            loading
              ? (
                <Loading size="6" />
              )
              : (
                <>
                  <button
                    type="button"
                    className="loginButton"
                    disabled={ disabled }
                    onClick={ handleClick }
                  >
                    ENTRAR
                  </button>
                  <button
                    type="button"
                    onClick={ handleGuestClick }
                  >
                    Entrar como Convidado
                  </button>
                </>
              )
          }
        </form>
        <span>
          Ainda não tem conta?
          <Link to="/register">criar</Link>
        </span>
      </section>
    </div>
  );
}

export default Login;
