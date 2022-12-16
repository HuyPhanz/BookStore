export const BASE_PATH = 'http://localhost:8005'

export const AUTH_PATH = {
  REGISTER_PATH: `${BASE_PATH}/register`,
  LOGIN_PATH: `${BASE_PATH}/login`,
  LOGOUT_PATH: `${BASE_PATH}/logout`
}

export const ADMIN_PATH = {
  USER: `${BASE_PATH}/cms/users`,
  STORE: `${BASE_PATH}/cms/store`,
  PRODUCT: `${BASE_PATH}/cms/product`,
  CITY: `${BASE_PATH}/cms/city`,
  DISTRICT: `${BASE_PATH}/cms/district`,
  WARD: `${BASE_PATH}/cms/ward`
}

