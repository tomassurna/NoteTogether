var MyBloc = artifacts.require("./MyBloc.sol");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(MyBloc, { from: accounts[0], gas: 6700000 });
};
