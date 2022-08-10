import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: process.env.STAGING_ALCHEMY_URL,
      accounts: [process.env.STAGING_PRIVATE_KEY!],
      // gas: 2100000,
      // gasPrice: 8000000000,
    },
  },
};

export default config;
