// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Kill {
    address  private immutable owner;
    
    constructor() payable {
        owner = msg.sender;
    }
    
    function kill() external {
        require(msg.sender == owner, "Not is owner");
        selfdestruct(payable(msg.sender));
    }

    function test() public pure returns(uint) {
        return 123;
    }
   
}
