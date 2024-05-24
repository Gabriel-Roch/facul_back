import express, { Request, Response } from "express"
const route = express()
import { controllers } from "../../controller/controllers"

//ROUTE USERS
route.route("/users")
    .get((req: Request, res: Response) => controllers.getAllUsers(req, res))
    .post((req: Request, res: Response) => controllers.registerUser(req, res))

//ROUTE SUPPLIER
route.route("/supplier")
    .get((req: Request, res: Response) => controllers.getAllSupplier(req, res))
    .post((req: Request, res: Response) => controllers.registerSupplier(req, res))

//ROUTE MASTER PAYMENTS
route.route("/paymentsMethods")
    .get((req: Request, res: Response) => controllers.getAllPayments(req, res))
    .post((req: Request, res: Response) => controllers.registerPaymentsMethod(req, res))

//ROUTE PRODUCTS
route.route("/products")
    .get((req: Request, res: Response) => controllers.getAllProducts(req, res))
    .post((req: Request, res: Response) => controllers.registerProducts(req, res))
    .put((req: Request, res: Response) => controllers.updateProducts(req, res))
    .delete((req: Request, res: Response) => controllers.deleteProduct(req, res))

//ROUTE PRICE PRODUCTS
route.route("/products/price")
    .get((req: Request, res: Response) => controllers.getAllPriceById(req, res))
    .post((req: Request, res: Response) => controllers.registedPriceProduct(req, res))

//ROUTES SALE
route.route("/sale")
    .post((req: Request, res: Response) => controllers.sale(req, res))

//REPORTS
route.route("/report")
    .get((req: Request, res: Response) => controllers.report(req, res))


export { route }