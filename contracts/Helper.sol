// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TestContract1 {
    address public owner = msg.sender;

    function setOwner(address _owner) public {
        require(msg.sender == _owner, "not owner");
        owner = _owner;
    }
}

contract TestContract2 {
    address public owner = msg.sender;
    uint public value = msg.value;
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) payable {
        x = _x;
        y = _y;
    }
}

contract Helper {
    function getBytecode1() external pure returns(bytes memory) {
        bytes memory bytecode = type(TestContract1).creationCode;
        return bytecode;
    }
    
    function getBytecode2(uint _x, uint _y) external pure returns(bytes memory) {
        bytes memory bytecode = type(TestContract2).creationCode;
        return abi.encodePacked(bytecode, abi.encode(_x, _y));
    }

    function getCalldata(address _owner) external pure returns(bytes memory) {
        return abi.encodeWithSignature("setOwner(address)", _owner);
    }
}
