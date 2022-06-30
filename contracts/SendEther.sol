// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SendEther {
    constructor() payable {}

    receive() external payable {}

    function sendViaTransfer(address payable _to) external {
        _to.transfer(123);
    }

    function sendViaSend(address payable _to) external {
        bool ok = _to.send(123);
        require(ok, "Send failed");
    }

    function sendViaCall(address payable _to) external {
        (bool ok,) = _to.call{value: 123}("");
        require(ok, "Send failed");
    }
}

contract EthReceive {
    event Log(uint amount, uint gas);
    
    receive() external payable {
        emit Log(msg.value, gasleft());
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }
}
       
