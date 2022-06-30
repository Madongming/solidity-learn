import { expect } from "chai";
import { ethers } from "hardhat";

describe("Kill", function() {
  async function createKill() {
    const Kill = await ethers.getContractFactory("Kill");
    const kill = await Kill.deploy({ value: ethers.BigNumber.from("100") });
    await kill.deployed();
    return kill;
  }

  let kill: any;
  before("Deploy Kill Contract", async function() {
    kill = await createKill();
  });

  it("Can call test", async function() {
    expect(await kill.test()).to.equal(ethers.BigNumber.from("123"));

  });

  it("Destruct self", async function() {
    await kill.kill();
  });

  it("After destruct, call test, it should be failed", async function() {
    let e: any;
    try {
      await kill.test();
    } catch (err) {
      e = err as Error
    }
    expect(e).to.not.equal(undefined);
  });

});
