import { Router } from "express";

import BasketController from "../controllers/basket-controller";
import CatalogController from "../controllers/catalog-controller";
import OrderController from "../controllers/order-controller";
import PersonaPageEquipController from "../controllers/personaPageEquip-controller";
import ProfilesController from "../controllers/profiles-controller";

const router = Router();

import { body } from "express-validator";
import roleMiddleware from "../middlewares/role-middleware";

router.post(
  "/registration",
  body("password").isLength({ min: 3, max: 32 }),
  ProfilesController.registration
);
router.post("/login", ProfilesController.login);
router.post("/logout", ProfilesController.logout);
router.post("/insertbasket", BasketController.insertBasket);
router.post("/insertorders", OrderController.insertOrders);
router.post("/createEquipment", CatalogController.createItem);

router.get("/refresh", ProfilesController.refresh);

router.get("/users", roleMiddleware("admin"), ProfilesController.getUsers);

router.get("/allitems", CatalogController.allitems);

router.get("/img/:img", CatalogController.getImg);

router.get("/selctbasket/:id", BasketController.selectBasket);

router.get("/equipment/:id", PersonaPageEquipController.getEquipmentsById);

router.get("/selectorders/:id", OrderController.selectOrders);

router.get(
  "/selectAllorders",
  roleMiddleware("admin"),
  OrderController.selectAllOrders
);

router.get("/selectinfoorder/:id_order", OrderController.selectOrderById);

router.patch("/decreaseBasket", BasketController.decreaseBasket);
router.patch("/changestatusorder", OrderController.changeStatusOrder);
router.patch("/usercancel/:id_order", OrderController.CancelStatusUser);

router.delete("/deleteorder/:id_order", OrderController.deleteOrder);
router.delete("/deleteBasket", BasketController.deleteBasket);
router.delete("/clearbasket/:id_user", BasketController.clearBasket);

export default router;
