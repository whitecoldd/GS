const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tableRoute = require("./routes/table");
const formRoute = require("./routes/form");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
dotenv.config();
// const { TOKEN, SERVER_URL } = process.env
// const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
// const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL + URI
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connection Successful"))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());

app.use(bodyParser.json());

// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
//     console.log(res.data)
// }

// app.post(URI, async (req, res) => {
//     console.log(req.body)

//     const chatId = req.body.message.chat.id
//     const text = req.body.message.text

//     await axios.post(`${TELEGRAM_API}/sendMessage`, {
//         chat_id: chatId,
//         text: text
//     })
//     return res.send()
// })
//app.use(express.json());
app.use("/api/form", formRoute);
app.use("/api/table", tableRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("GSDONE/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "GSDONE", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 9000, async () => {
  console.log("backend server is up on PORT " + process.env.PORT || 9000);
  //await init()
});
