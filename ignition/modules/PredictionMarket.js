const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("PredictionMarketModule", (m) => {
  const predictionMarket = m.contract("PredictionMarket");

  return { predictionMarket };
});