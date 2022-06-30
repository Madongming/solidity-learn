// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TodoList {
    struct Todo {
        string text;
        bool completed;
    }

        Todo[] public todos;
    uint private count;

    event CreateTodo(uint id);
    event UpdateTodo(uint id);
    event ToggleCompleted(uint id);

    modifier isExist(uint _id) {
       require(_id < count, "the todo is not exist!");
       _;
    }
    
    function create(string calldata _text) public {
        Todo memory todo = Todo(_text, false);
        todos.push(todo);
        emit CreateTodo(count);
        count++;
    }

    function updateText(uint _index, string calldata _text) public isExist(_index) {
        // 此方法在多个字段要更新的时候更省gas
        // Todo storage todo = todos[_index];
        // todo.text = _text;
        // 此方法在一个字段要更新的时候更生gas
        todos[_index].text = _text;
        emit UpdateTodo(_index);
    }

    function get(uint _index) public view isExist(_index) returns(string memory, bool) {
        // 此种方法更费gas
        // Todo memory todo = todos[_index];
        // 此种方法更省gas
        Todo storage todo = todos[_index];
        return (todo.text, todo.completed);
    }

    function getList() public view returns(Todo[] memory) {
        return todos;
    }

    function toggleCompleted(uint _index) public isExist(_index) {
        todos[_index].completed = !todos[_index].completed;
    }
}
