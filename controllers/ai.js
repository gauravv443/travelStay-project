const axios = require("axios");
const Listing = require("../models/listing");

module.exports.chat = async (req, res) => {
    try {
        const { message } = req.body;

        const city = message
            .toLowerCase()
            .replace(
                /hotels?|hotel|stay|stays|rooms?|room|accommodation|accommodations|in|at|near|find|show|me|for/gi,
                ""
            )
            .trim();

        const isHotelQuery =
            /hotel|hotels|stay|stays|room|rooms|accommodation/i.test(message);

        let listingText = "";
        let hasMatchingListings = false;

        if (isHotelQuery) {
            const matchingListings = await Listing.find({
                $or: [
                    { location: { $regex: city, $options: "i" } },
                    { country: { $regex: city, $options: "i" } },
                    { title: { $regex: city, $options: "i" } }
                ]
            }).select("title location country price");

            hasMatchingListings = matchingListings.length > 0;

            listingText = matchingListings
                .map(
                    (listing) =>
                        `${listing.title} | ${listing.location}, ${listing.country} | ₹${listing.price}`
                )
                .join("\n");
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: `You are a Travel AI Assistant.

Available Listings:
${listingText || "No matching listings found."}

Rules:
1. If the user's question is about hotels, stays or accommodation:
   - If listings are available, recommend ONLY those listings.
   - If no listings are available, clearly say no matching listing is available on TravelStay and then give general advice.

2. If the question is about tourist places, food, itinerary, budget, weather or travel information, answer normally. Don't mention listing availability.

3. Reply in plain text only.
4. If the user asks to plan a trip, create an itinerary based on the destination, number of days, and budget (if provided). Include places to visit, suggested activities, food recommendations, and travel tips.
5. Never use Markdown.
Never use #, ##, **, ---, |, tables, code blocks, or bullet symbols.
Use simple headings like "Day 1", "Day 2", "Budget", "Tips".
Write in short paragraphs or numbered points only.
Keep the response clean and mobile-friendly.`
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
            reply: "Something went wrong!"
        });
    }
};