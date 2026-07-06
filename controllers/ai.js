const axios = require("axios");

module.exports.chat = async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content:
                            `You are a Travel AI Assistant. Always reply in plain text only.
                            Do not use Markdown.
                            Do not use **, ##, | tables, bullets with markdown, or code blocks.
                            Use simple numbered points and short paragraphs.`
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            reply: response.data.choices[0].message.content
        });

    } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({
        reply: err.response?.data || err.message
    });
}
};