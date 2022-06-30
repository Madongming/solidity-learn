import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, utils } from "ethers";

describe("EtherWallet", function() {
  async function createEtherWallet() {
    const EtherWallet = await ethers.getContractFactory("EtherWallet");
    const etherWallet = await EtherWallet.deploy();
    await etherWallet.deployed();
    return etherWallet;
  }

  let etherWallet: any;
  before("Deploy EtherWallet Contract", async function() {
    etherWallet = await createEtherWallet();
  });

  it("Send 1 ether ", async function() {
    await etherWallet.sendEther({ value: utils.parseEther("1") });
    expect(await etherWallet.getBalance()).to.equal(utils.parseEther("1"));
  });

  it("Withdraw 123 wei", async function() {
    await etherWallet.withdraw(123);
    expect(await etherWallet.getBalance()).to.equal(BigNumber.from("999999999999999877"));
  });
});
