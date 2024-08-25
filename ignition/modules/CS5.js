const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("CS5", (m) => {


  const CS5 = m.contract("CS5", []);

  return { CS5 };
});
