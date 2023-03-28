import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { readUser, register } from '../../services/userAPI';
import Loading from '../../components/Loading';
import styles from './Register.module.css';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const MIN_USERNAME_LENGTH = 3;
  const MIN_PASSWORD_LENGTH = 6;
  const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const VALID_EMAIL = EMAIL_REGEX.test(email);
  const VALID_PASSWORD = (
    password.length >= MIN_PASSWORD_LENGTH
    && password === password2
  );
  const disabled = (
    username.length < MIN_USERNAME_LENGTH
    || !VALID_EMAIL
    || !VALID_PASSWORD
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
      CONFLICT: 409,
      CREATED: 201,
    };
    const result = await register({
      username,
      email,
      password,
      password2,
    });
    if (result === statusCode.CONFLICT) {
      setLoading(false);
      // eslint-disable-next-line no-alert
      alert('Nome de usuário ou e-mail já cadastrados!');
    }
    if (result === statusCode.CREATED) {
      setLoading(false);
      navigate('/login');
    }
  };

  const registerButton = document.querySelector('.registerButton');
  document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      registerButton?.click();
    }
  });

  return (
    <div className={ styles.pageRegister }>
      <section className={ styles.registerContainer }>
        <h1>Cadastro</h1>
        <form>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              onChange={ (event) => {
                setUsername(event.target.value);
              } }
              value={ username }
            />
          </label>
          {
            username.length > 0 && username.length < MIN_USERNAME_LENGTH
              && (
                <span>
                  <p className={ styles.warning }>
                    O nome deve ter no mínimo 3 caracteres
                  </p>
                </span>
              )
          }
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={ (event) => {
                setEmail(event.target.value);
              } }
              value={ email }
            />
          </label>
          {
            email.length > 0 && !VALID_EMAIL
              && (
                <span>
                  <p className={ styles.warning }>
                    O e-mail deve ter um formato válido
                  </p>
                </span>
              )
          }
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              onChange={ (event) => {
                setPassword(event.target.value);
              } }
              value={ password }
            />
          </label>
          {
            password.length > 0 && password.length < MIN_PASSWORD_LENGTH
              && (
                <span>
                  <p className={ styles.warning }>
                    A senha deve ter no mínimo 6 caracteres
                  </p>
                </span>
              )
          }
          <label htmlFor="password2">
            <input
              type="password"
              name="password2"
              placeholder="Confirme sua senha"
              onChange={ (event) => {
                setPassword2(event.target.value);
              } }
              value={ password2 }
            />
          </label>
          {
            password2.length > 0 && !VALID_PASSWORD
              && (
                <span>
                  <p className={ styles.warning }>
                    Senha diferente
                  </p>
                </span>
              )
          }
          {
            loading
              ? (
                <Loading size="4" />
              )
              : (
                <button
                  type="button"
                  className="registerButton"
                  disabled={ disabled }
                  onClick={ handleClick }
                >
                  CADASTRAR
                </button>
              )
          }
        </form>
        <span>
          Já tem conta?
          <Link to="/login">login</Link>
        </span>
      </section>
    </div>
  );
}

export default Register;
