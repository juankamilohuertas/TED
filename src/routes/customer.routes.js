import { Router } from "express";
import {
  renderHome,
  createCustomers,
  deleteCustomer,
  editCustomer,
  renderCustomers,
  updateCustomer,
  renderPhoto,
  sendPhoto,
  signupCustomer,
  signupValidate,
  validateSignIn,
  signInCustomer,
} from "../controllers/customerController.js";

const router = Router();

router.get("/", renderHome);
router.get("/photo", renderPhoto);
router.post("/photo", sendPhoto);
router.get("/panel", renderCustomers);
router.post("/add", createCustomers);
router.get("/update/:id", editCustomer);
router.post("/update/:id", updateCustomer);
router.get("/delete/:id", deleteCustomer);
router.get("/signup", signupCustomer);
router.get("/signIn", signInCustomer);
router.post("/signIn", validateSignIn)
router.post("/signup", signupValidate);

export default router;
