// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Proxy {
    event Deploy(address);

    fallback() external payable {}
    
    function deploy(bytes memory _code) external payable returns(address _address) {
        assembly {
        _address := create(callvalue(), add(_code, 0x20), mload(_code))
        }

        require(_address != address(0), "Deploy failed");

        emit Deploy(_address);
    }

    function execute(address _target, bytes memory _data)
        external
        payable
    {
        (bool success,) = _target.call{value:msg.value}(_data);
        require(success, "failed");
    }
}
