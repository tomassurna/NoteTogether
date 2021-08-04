var NoteTogether = artifacts.require("./NoteTogether.sol");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(NoteTogether, { from: accounts[0], gas: 6700000 });
};
