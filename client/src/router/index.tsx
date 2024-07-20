import { RouteObject } from "react-router-dom";
import RegisterPage from "../components/mainPage/registerPage/RegisterPage";
import LoginPage from "../components/mainPage/loginPage/LoginPage";
import CatalogPage from "../components/mainPage/catalogPage/CatalogPage";
import BasketPage from "../components/mainPage/basketPage/BasketPage";
import MakingOrder from "../components/mainPage/makingOrder/MakingOrder";
import PersonalPageEquipment from "../components/mainPage/personalPageEquipment/PersonalPageEquipment";
import InformationAboutOrder from "../components/mainPage/informationAboutOrder/InformationAboutOrder";
import OrdersInfo from "../components/mainPage/ordersInfo/OrdersInfo";

export const routesList: RouteObject[] = [
  { path: "/registration", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/catalog", element: <CatalogPage /> },
  { path: "/basket", element: <BasketPage /> },
  { path: "/makingOrder", element: <MakingOrder /> },
  { path: "/personalPageEquipment/:id", element: <PersonalPageEquipment /> },
  { path: "/info/:id", element: <InformationAboutOrder /> },
  { path: "/ordersInfo", element: <OrdersInfo /> },
];
