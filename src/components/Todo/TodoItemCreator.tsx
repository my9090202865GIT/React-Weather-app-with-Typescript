import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../recoil/todoRecoil";
import { v4 as uuid } from "uuid";
function getId() {
  return uuid()
}
export interface todoItem{
  id:string,
  text: string,
  isComplete: boolean
}
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false
      }
    ]);
    setInputValue("");
  };

  const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

export default TodoItemCreator;
