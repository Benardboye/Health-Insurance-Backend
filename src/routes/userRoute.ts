import express,{Request, Response} from "express"
import { CreateUser, LoginUser } from "../controller/userController"

const router = express.Router()

router.post('/create', CreateUser)
router.post('/login', LoginUser)




export default router