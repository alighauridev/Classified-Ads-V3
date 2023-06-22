import { combineReducers } from "redux";
import {
  allProductsReducer,
  newProductReducer,
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productEditReducer,
  singleProductReducer,
} from "./productReducers";
import { userListReducer, userLoginReducer } from "./userReducers";
import { getOrdersReducer, orderDeliverReducer, orderDetailsReducer } from "./orderReducers";
import { categoryListReducer } from "./categoryReducers";
const RootReducer = combineReducers({
  UserLogin: userLoginReducer,
  UserList: userListReducer,
  Products: allProductsReducer,
  newProduct: newProductReducer,
  ProductDelete: productDeleteReducer,
  ProductCreate: productCreateReducer,
  ProductUpdate: productEditReducer,
  ProductDetails: singleProductReducer,
  Orders: getOrdersReducer,
  OrderDetails: orderDetailsReducer,
  OrderDeliver: orderDeliverReducer,
  Categories: categoryListReducer,
});

export default RootReducer;
