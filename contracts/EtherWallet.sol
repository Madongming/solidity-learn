// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract EtherWallet {

    address public owner;

    event ReceiveEther(uint amount);
    event WithdrawEther(uint amount);
    
    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit ReceiveEther(msg.value);
    }

    function sendEther() external payable {
        emit ReceiveEther(msg.value);
    }
    
    function withdraw(uint _amount) external {
        require(msg.sender == owner, "Caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        require(msg.sender == owner, "Caller is not owner");
        return address(this).balance;
    }
    
}
    
