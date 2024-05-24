import dotenv from "dotenv";
import { connectDB } from "../server/database/database.js"
import { app } from "../server/app.js"
import { paymentRouter } from "./routes/payment.routes.js";
dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server started at http://localhost:${process.env.PORT}`)
    })
    app.on("error", (error) => {
        console.log("Error: ", error)
        throw error
    })

    app.use("/api/payment", paymentRouter);
})
.catch((error) => {
    console.log("Mongodb connection failed ", error)
})