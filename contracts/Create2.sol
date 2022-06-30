// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract CreatedContract {
    uint private num;

    constructor(uint _num) {
        num = _num;
    }
}

contract ContractCreate2Factory {
    uint private num;
    uint private salt;
    address private createdContract;

    constructor(uint _num, uint _salt) {
        num = _num;
        salt = _salt;
    }
    
    function deploy() public {
        createdContract = address(new CreatedContract{salt: bytes32(salt)}(num));
    }

    function getDeployed() public view returns(address) {
        return createdContract;
    }

    function computeDeployedAddress() public view returns(address) {
        bytes32 hash = keccak256(
                                 abi.encodePacked(
                                                  bytes1(0xff),
                                                  address(this),
                                                  bytes32(salt),
                                                  keccak256(getBytecode())));

        return address(uint160(uint(hash)));
    }

    function getBytecode() private view returns(bytes memory) {
        return abi.encodePacked(
                                type(CreatedContract).creationCode,
                                abi.encode(num));
    }
}
