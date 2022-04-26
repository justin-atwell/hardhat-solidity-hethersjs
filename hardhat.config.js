require("hardhat-hethers");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.13",
  defaultNetwork: 'testnet',
  hedera: {
    gasLimit: 300000,
    networks: {
      testnet: {
        accounts: [
          {
            "account": '0.0.610551',
            "privateKey": ''
          }
        ]
      }
    }
  }
};
