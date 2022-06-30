import { expect } from "chai";
import { ethers } from "hardhat";

describe("AccessRole", function() {
  async function createAccessRole() {
    const TestAccessRole = await ethers.getContractFactory("TestAccessRole");
    const testAccessRole = await TestAccessRole.deploy();
    await testAccessRole.deployed();
    return testAccessRole;
  }

  let testAccessRole: any;
  let Account1: any;
  let Account2: any;
  before("Deploy TestAccessRole Contract", async function() {
    testAccessRole = await createAccessRole();
    const accounts = await ethers.getSigners();
    Account1 = accounts[1];
    Account2 = accounts[2];
    await testAccessRole.grantRole(Account1.address, await testAccessRole.getAdmin());
    await testAccessRole.grantRole(Account2.address, await testAccessRole.getUser());
  });

  it("Account1 call onlyAdminCall", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account1).onlyAdminCall();
    } catch (err) {
      e = err as Error
    }

    expect(e).to.equal(undefined);
  });

  it("Account1 call onlyUserCall", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account1).onlyUserCall();
    } catch (err) {
      e = err as Error
    }
    expect(e.message.includes("not authorized")).to.equal(true);

  });

  it("Account2 call onlyAdminCall", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account2).onlyAdminCall();
    } catch (err) {
      e = err as Error;
    }
    expect(e.message.includes("not authorized")).to.equal(true);
  });

  it("Account2 call onlyUserCall", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account2).onlyUserCall();
    } catch (err) {
      e = err as Error;
    }
    expect(e).to.equal(undefined);
  });

  it("Invoke all", async function() {
    await testAccessRole.invokeRole(Account1.address, testAccessRole.getAdmin());
    await testAccessRole.invokeRole(Account2.address, testAccessRole.getUser());

  });

  it("Account1 call onlyAdminCall again", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account1).onlyAdminCall();
    } catch (err) {
      e = err as Error
    }
    if (e === undefined) {
      expect(e).to.not.equal(undefined);
    } else {
      expect(e.message.includes("not authorized")).to.equal(true);
    }
  });

  it("Account1 call onlyUserCall again", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account1).onlyUserCall();
    } catch (err) {
      e = err as Error;
    }
    if (e === undefined) {
      expect(e).to.not.equal(undefined);
    } else {
      expect(e.message.includes("not authorized")).to.equal(true);
    }
  });

  it("Account2 call onlyAdminCall again", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account2).onlyAdminCall();
    } catch (err) {
      e = err as Error;
    }
    if (e === undefined) {
      expect(e).to.not.equal(undefined);
    } else {
      expect(e.message.includes("not authorized")).to.equal(true);
    }
  });

  it("Account2 call onlyUserCall again", async function() {
    let e: any;
    try {
      await testAccessRole.connect(Account2).onlyUserCall();
    } catch (err) {
      e = err as Error
    }
    if (e === undefined) {
      expect(e).to.not.equal(undefined);
    } else {
      expect(e.message.includes("not authorized")).to.equal(true);
    }
  });

});
