import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

let Account1: any;

describe("SendEther", function() {
  async function createSendEther() {
    const SendEther = await ethers.getContractFactory("SendEther");
    const sendEther = await SendEther.deploy({ value: 500 });
    await sendEther.deployed();
    return sendEther;
  }

  async function createEthReceive() {
    const EthReceive = await ethers.getContractFactory("EthReceive");
    const ethReceive = await EthReceive.deploy();
    await ethReceive.deployed();
    return ethReceive;
  }

  let ethReceive: any;
  let sendEther: any;
  before("Deploy SendEther and EthReceive Contract", async function() {
    sendEther = await createSendEther();
    ethReceive = await createEthReceive();
  });

  it("Send 123 wei via Transfer", async function() {
    await sendEther.sendViaTransfer(ethReceive.address);
    expect(await ethReceive.getBalance()).to.equal(BigNumber.from("123"));
  });

  it("Send 123 wei via Send", async function() {
    await sendEther.sendViaSend(ethReceive.address);
    expect(await ethReceive.getBalance()).to.equal(BigNumber.from("246"));
  });

  it("Send 123 wei via Call", async function() {
    await sendEther.sendViaCall(ethReceive.address);
    expect(await ethReceive.getBalance()).to.equal(BigNumber.from("369"));
  });
});
