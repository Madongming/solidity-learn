// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract AccessRole {
    event GrantRole(bytes32 indexed role, address indexed account);
    event InvokeRole(bytes32 indexed role, address indexed account);

    mapping(bytes32 => mapping(address => bool)) private roles;

    bytes32 internal constant ADMIN = keccak256(abi.encodePacked("ADMIN"));
    bytes32 internal constant USER = keccak256(abi.encodePacked("USER"));

    modifier onlyRole(bytes32 _role) {
        require(roles[_role][msg.sender], "not authorized");
        _;
    }
    
    constructor() {
        roles[ADMIN][msg.sender] = true;
    }


    function getAdmin() public view returns(bytes32) {
        return ADMIN;
    }

    function getUser() public view returns(bytes32) {
        return USER;
    }

    function grantRole(address _account, bytes32 _role) public onlyRole(ADMIN) {
        _changeRole(_account, _role, true);
        emit GrantRole(_role, _account);
    }

    function invokeRole(address _account, bytes32 _role) public onlyRole(ADMIN) {
        _changeRole(_account, _role, false);
        emit InvokeRole(_role, _account);
    }

    function _changeRole(address _account, bytes32 _role, bool _grantOrInvoke) private {
        roles[_role][_account] = _grantOrInvoke;
    }
}

contract TestAccessRole is AccessRole {
    event OnlyAdminCall(address indexed account, string functionName);
    event OnlyUserCall(address indexed account, string functionName);
    
    function onlyAdminCall() public onlyRole(ADMIN) {
        emit OnlyAdminCall(msg.sender, "onlyAdminCall");
    }

    function onlyUserCall() public onlyRole(USER) {
        emit OnlyUserCall(msg.sender, "onlyUserCall");
    }
}
