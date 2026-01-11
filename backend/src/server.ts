import connectDB from "./config/db.js";
import app from "./app.js";
const port = 3000;

connectDB();
app.listen(port, () => {
    console.log("server is listening to port : http://localhost:3000")
})