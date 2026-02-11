const axios = require("axios");
const getPropertyAds = async (req, res) => {
  try {
    const resp = await axios.get(
      `https://oapaiqtgkr6wfbum252tswprwa0ausnb.lambda-url.eu-central-1.on.aws/?input=${req.query.input}`,
    );
    return res.status(200).json({
      body: resp.data,
    });
  } catch (err) {
    return res.status(500).json({
      title: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  getPropertyAds,
};
