const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("ClothStore", (m) => {


  const ClothStore = m.contract("ClothStore", []);

  return { ClothStore };
});
