const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");



module.exports = buildModule("ClothingStore", (m) => {


  const ClothingStore = m.contract("ClothingStore", []);

  return { ClothingStore };
});
