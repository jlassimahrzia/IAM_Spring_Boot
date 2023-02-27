require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const LOCALHOST_URL = "http://localhost:8545";
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost : {
      url: LOCALHOST_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
