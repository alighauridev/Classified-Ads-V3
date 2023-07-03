import { combineReducers } from "redux";
import { getFilterProductReducer } from "./filterProductReducer";
import { cartReducer } from "./cartReducer";
import { allProductsReducer, productCreateReviewReducer, singleProductReducer } from "./productReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./userReducers";
import { shippingDetailsReducer } from "./checkoutReducer";
import {
  allOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";
import { carsReducer, toggleReducer } from "./carReducers";
import { rentalReducer } from "./rentalReducer";
import filterReducer from "./filterReducer";
import favoriteReducer from "./favoriteReducers";
import { bookingCreateReducer, getUserBookingsReducer } from "./bookingReducer";
import { addressReducer, addressDetailReducer, addressUpdateReducer } from "./addressReducer";
import loadingReducer from "./loading";
const RootReducer = combineReducers({
  Products: allProductsReducer,
  ProductDetails: singleProductReducer,
  ProductCreateReview: productCreateReviewReducer,
  Cart: cartReducer,
  Cars: carsReducer,
  CreateBooking: bookingCreateReducer,
  Bookings: getUserBookingsReducer,
  loading: loadingReducer,
  Address: addressReducer,
  AddressDetails: addressDetailReducer,
  AddressUpdates: addressUpdateReducer,
  Favorite: favoriteReducer,
  toggle: toggleReducer,
  Filters: filterReducer,
  RentalInfo: rentalReducer,
  Checkout: shippingDetailsReducer,
  UserLogin: userLoginReducer,
  UserDetails: userDetailsReducer,
  UserUpdate: userUpdateReducer,
  UserRegister: userRegisterReducer,
  OrderCreate: orderCreateReducer,
  OrderDetails: orderDetailsReducer,
  OrderPay: orderPayReducer,
  Orders: allOrdersReducer,
  filterData: getFilterProductReducer,

});

export default RootReducer;
