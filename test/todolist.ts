import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

describe("Todo", function() {
  async function createTodoList() {
    const TodoList = await ethers.getContractFactory("TodoList");
    const todoList = await TodoList.deploy();
    await todoList.deployed();
    return todoList
  }

  let todoList: any;
  before("Deploy TodoList Contract", async function() {
    todoList = await createTodoList();
  });

  it("Add a todo", async function() {
    await todoList.create("First todo.");
    expect((await todoList.get(BigNumber.from("0")))[0]).to.equal("First todo.");
  });

});
