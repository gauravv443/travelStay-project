const axios = require("axios");

async function geocode(address) {
    console.log(address);
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "WanderlustApp/1.0"
      }
    }
  );
  console.log(response.data);
  if (response.data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon
  };
}

module.exports = geocode;

