const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";
export const BASE_IMG_URL = "https://upskilling-egypt.com:3006";

// USERS URL
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLS = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  getList: (pageSize: number, pageNumber: number, userName: string, email: string,groups:string) =>
    `${BASE_USERS}?pageSize=${pageSize}&pageNumber=${pageNumber}&userName=${userName}&email=${email}&groups=${groups}`,
  getUsersNum: () => `${BASE_USERS}`,
  delete: (id: number) => `${BASE_USERS}/${id}`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  reset: `${BASE_USERS}/Reset`,
  verify: `${BASE_USERS}/verify`,
};

// HEADERS TOKEN
export const BASE_HEADERS = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  },
};

// CATEGORY URL
const BASE_CATEGORY = `${BASE_URL}/Category`;

export const CATEGORIES_URLS = {
  getList: (pageSize: number, pageNumber: number, name: string) =>
    `${BASE_CATEGORY}?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}`,
  getCategoriesNum: () => `${BASE_CATEGORY}`,
  gitSelectList: `${BASE_CATEGORY}`,
  add: `${BASE_CATEGORY}`,
  delete: (id: number) => `${BASE_CATEGORY}/${id}`,
  update: (id: number) => `${BASE_CATEGORY}/${id}`,
};

// RECIPE URL
const BASE_RECIPE = `${BASE_URL}/Recipe`;

export const RECIPES_URLS = {
  getList: (pageSize: number, pageNumber: number) =>
    `${BASE_RECIPE}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
  getFilterList: (pageSize:number, pageNumber:number, name:string, tagId:string, categoryId:string) =>
    `${BASE_RECIPE}?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}&tagId=${tagId}&categoryId=${categoryId}`,
  getRecipeNum: () => `${BASE_RECIPE}`,
  delete: (id: number) => `${BASE_RECIPE}/${id}`,
  update: (id: number) => `${BASE_RECIPE}/${id}`,
  getOneItem: (id: number) => `${BASE_RECIPE}/${id}`,
  create: `${BASE_RECIPE}`,
};

// USER RECIPE URL
const BASE_USERRECIPE = `${BASE_URL}/userRecipe`;

export const USER_RECIPES_URLS = {
  getList: `${BASE_USERRECIPE}`,
  addToFav: `${BASE_USERRECIPE}`,
  removeFromFav: (id: number) => `${BASE_USERRECIPE}/${id}`,
}

// TAG URL
export const GETALLTAGS = `${BASE_URL}/tag`;
