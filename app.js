const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require("./routes/index");

// user related route import
const userRouter = require("./api/Setting/user/user.route");
const RoleRouter = require("./api/Setting/role/role.route");
const {
  isLoggedIn
} = require("./middleware/userAuth");

// Company route import
const companyRouter = require("./api/Setting/Company/Company.Route");

// Outlet Route Import
const outletRouter = require("./api/Setting/outlet/outlet.route");

//Area Route Import
const areaRouter = require("./api/Setting/area/area.route");

// Table Route import
const tableRouter = require("./api/Setting/table/table.route");

// Kitchen Route Import
const kitchenRoute = require("./api/Setting/kitchen/kitchen.route");

// Ingredients Routes Import
const ingredientUnitRouter = require("./api/Setting/ingredientUnit/ingredientUnit.Route");
const ingredientCategoryRouter = require("./api/Setting/ingredientCategory/ingredientCategory.Route");
const ingredientRouter = require("./api/Setting/ingredients/ingredient.route");

// Food Route Import
const foodCategory = require("./api/Setting/foodCategory/foodCategory.route");
const foodMenuRouter = require("./api/Setting/foodMenu/foodMenu.Route");
const modifierRouter = require("./api/Setting/modifiers/modifier.route");
const FoodCombo = require("./api/Setting/foodCombos/foodCombo.Route");
const premadeFoodRouter = require("./api/Setting/preFoodMade/preFoodMade.Route");

//Order related Route Import
const orederRoutes = require("./api/Setting/order/order.Route");

// KOT Route Import
const kotRouter = require("./api/Setting/KOT/kot.router");

//Payment related route
const TaxRouter = require("./api/Setting/tax/tax.route");
const BillingRouter = require("./api/Setting/billing/billing.route");
const PaymentRouter = require("./api/Setting/payment/payment.route");

//DeliveryPartner route
const DeliveryPartnerRouter = require("./api/Setting/deliveryPartner/deliveryPartner.route");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Base URL
app.use("/", indexRouter);

// User base url
app.use("/user", userRouter);

// user authentication
// app.use(isLoggedIn);

// Role base url
app.use("/role", RoleRouter);


// Company Base URL
app.use("/company", companyRouter);

// Outlet Base URL
app.use("/setting/outlet", outletRouter);

// Area Base URL
app.use("/setting/area", areaRouter);

//Table Base URL
app.use("/setting/table", tableRouter);

// Ingredient Base URL
app.use("/setting/ingredient", ingredientRouter);
app.use("/setting/ingredientCategory", ingredientCategoryRouter);
app.use("/setting/ingredientUnit", ingredientUnitRouter);

// Food Relate Base URL
app.use("/setting/foodcategory", foodCategory);
app.use("/setting/foodmenu", foodMenuRouter);
app.use("/setting/modifier", modifierRouter);
app.use("/setting/foodcombo", FoodCombo);
app.use("/setting/preFoodMade", premadeFoodRouter);

//Order related url
app.use("/setting/order", orederRoutes);
app.use("/setting/kot", kotRouter);

//Kitchen related url
app.use("/setting/kitchen", kitchenRoute);

//Payment related url
app.use("/setting/tax", TaxRouter);
app.use("/setting/billing", BillingRouter);
app.use("/setting/payment", PaymentRouter);

//DeliveryPartner route
app.use("/setting/deliveryPartner", DeliveryPartnerRouter);

// moongoose Connection

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;