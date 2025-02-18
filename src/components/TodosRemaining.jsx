import React from 'react';

function TodosRemaining(props) {
  return (
    <span>
      {props.todosRemaining !== 1
        ? props.todosRemaining + ' items '
        : props.todosRemaining + ' item '}
      remaining
    </span>
  );
}

export default TodosRemaining;
