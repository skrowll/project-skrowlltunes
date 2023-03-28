const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

export const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

export const login = async (data) => {
  const statusCode = {
    NOTFOUND: 404,
    UNAUTHORIZED: 401,
    OK: 200,
  };
  const response = await fetch('https://postgresql-api.onrender.com/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  if (response.status === statusCode.NOTFOUND) {
    return statusCode.NOTFOUND;
  }
  if (response.status === statusCode.UNAUTHORIZED) {
    return statusCode.UNAUTHORIZED;
  }
  if (response.status === statusCode.OK) {
    saveUser({ ...result });
    return statusCode.OK;
  }
};

export const register = async (data) => {
  const statusCode = {
    CONFLICT: 409,
    CREATED: 201,
  };
  const response = await fetch('https://postgresql-api.onrender.com/register', {
    method: 'POST',
    body: JSON.stringify({ ...data, role: 'user' }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('STATUS', response.status);
  if (response.status === statusCode.CONFLICT) {
    return statusCode.CONFLICT;
  }
  if (response.status === statusCode.CREATED) {
    return statusCode.CREATED;
  }
};

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    username: '',
    email: '',
    password: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
