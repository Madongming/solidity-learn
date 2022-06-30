import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deploy", function() {
  async function createProxy() {
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();
    await proxy.deployed();
    return proxy
  }

  async function createHelper() {
    const Helper = await ethers.getContractFactory("Helper");
    const helper = await Helper.deploy();
    await helper.deployed();
    return helper;
  }

  let proxy: any;
  let helper: any;
  before("Create Contract Proxy and Helper", async function() {
    proxy = await createProxy();
    helper = await createHelper();
  });

  it("Deploy TestContract1 With Proxy", async function() {
    const bytecode = await helper.getBytecode1();
    const test1Address = await proxy.deploy(bytecode);
    //console.log("TestContract1:", test1Address);
  });


  it("Deploy TestContract2 With Proxy", async function() {
    const bytecode = await helper.getBytecode2(1, 2);
    const test2Address = await proxy.deploy(bytecode);
    //console.log("TestContract2:", test2Address);
  });


});
