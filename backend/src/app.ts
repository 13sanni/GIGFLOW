import express from "express";
const app = express();
app.use(express.json())

app.use("/", (req, res) => {
    res.send("hii to gigflow")
})

export default app