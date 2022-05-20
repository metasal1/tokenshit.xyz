module.exports = async (req, res) => {
  try {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenSupply",
      params: [req.query.mint],
      // params: ["2LTLhkeLvhuQw1Z343jwn8iwmbDQL85BH7KvDWjNr6q1"],
    });

    fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        res.status(200).json({
          data
        });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ data: error.message });
  }
};
