import { expect } from "chai";
import { ethers } from "hardhat";

describe("ContractCreate2Factory", function() {
  async function createContractCreate2Factory() {
    const ContractCreate2Factory = await ethers.getContractFactory("ContractCreate2Factory");
    const contractCreate2Factory = await ContractCreate2Factory.deploy(ethers.BigNumber.from("888"), ethers.BigNumber.from("777"));
    await contractCreate2Factory.deployed();
    return contractCreate2Factory;
  }

  let contractCreate2Factory: any;
  before("Deploy ContractCreate2Factory Contract", async function() {
    contractCreate2Factory = await createContractCreate2Factory();
  });

  it("Deploy Test contract", async function() {
    await contractCreate2Factory.deploy();

  });

  it("Should Addresses are eqaul", async function() {
    const deployedAddress = await contractCreate2Factory.getDeployed();
    const computeDeployedAddress = await contractCreate2Factory.computeDeployedAddress();

    expect(deployedAddress).to.equal(computeDeployedAddress);

    console.log("deployedAddress:", deployedAddress);
    console.log("computeDeployedAddress:", computeDeployedAddress);
  });

});
