import express,{Request, Response} from "express"
import UserRoute from "./routes/userRoute"
import PlanRoute  from "./routes/planRoute"
import dotenv from "dotenv"
import logger from "morgan"
import connectDB from "./config/db-connect"
import cors from "cors"

let port:string|number = process.env.PORT!
dotenv.config()
const app = express()
port = port || process.env.PORT || 5000


app.use(cors())
app.use(express.json())
app.use(logger("dev"))
connectDB()

app.use("/api/user", UserRoute)
app.use("/api/plan", PlanRoute)

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})

export default app