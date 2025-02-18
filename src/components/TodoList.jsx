import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodosRemaining from './TodosRemaining';

function TodoList(props) {
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState(props.todos);

  function completeTodo(id) {
    const updatedTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    props.setTodos(updatedTodos);
  }

  function deleteTodo(id) {
    props.setTodos([...props.todos].filter((todo) => todo.id !== id));
  }

  function markAsEditing(id) {
    const updatedTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = true;
      }

      return todo;
    });

    props.setTodos(updatedTodos);
  }

  function cancelEdit(id) {
    const updatedTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditing = false;
      }

      return todo;
    });

    props.setTodos(updatedTodos);
  }

  function updateTodo(event, id) {
    const updatedTodos = props.todos.map((todo) => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return;
        }

        todo.title = event.target.value;
        todo.isEditing = false;
      }

      return todo;
    });

    props.setTodos(updatedTodos);
  }

  function remaining() {
    return props.todos.filter((todo) => !todo.isComplete).length;
  }

  function checkAll() {
    const updatedTodos = props.todos.map((todo) => {
      todo.isComplete = true;

      return todo;
    });

    props.setTodos(updatedTodos);
  }

  function clearCompleted() {
    const updatedTodos = props.todos.filter((todo) => !todo.isComplete);

    props.setTodos(updatedTodos);
  }

  function getFiltered() {
    let updatedTodos = [];

    if (filter === 'all') {
      updatedTodos = props.todos;
    } else if (filter === 'completed') {
      updatedTodos = props.todos.filter((todo) => todo.isComplete);
    } else if (filter === 'active') {
      updatedTodos = props.todos.filter((todo) => !todo.isComplete);
    }

    return updatedTodos;
  }

  function changeFilter(value) {
    setFilter(value);
  }

  return (
    <>
      <ul className="todo-list">
        {getFiltered().map((todo, index) => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => completeTodo(todo.id)}
                checked={todo.isComplete}
              />

              {!todo.isEditing ? (
                <span
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                  onDoubleClick={() => markAsEditing(todo.id)}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  onBlur={(event) => updateTodo(event, todo.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      cancelEdit(todo.id);
                    }
                  }}
                  className="todo-item-input"
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button className="x-button" onClick={() => deleteTodo(todo.id)}>
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="check-all-container">
        <div>
          <div className="button" onClick={() => checkAll()}>
            Check All
          </div>
        </div>

        <TodosRemaining todosRemaining={remaining()}></TodosRemaining>
      </div>

      <div className="other-buttons-container">
        <div>
          <button
            className={`button filter-button + ${
              filter === 'all' ? 'filter-button-active' : ''
            }`}
            onClick={() => changeFilter('all')}
          >
            All
          </button>
          <button
            className={`button filter-button + ${
              filter === 'active' ? 'filter-button-active' : ''
            }`}
            onClick={() => changeFilter('active')}
          >
            Active
          </button>
          <button
            className={`button filter-button + ${
              filter === 'completed' ? 'filter-button-active' : ''
            }`}
            onClick={() => changeFilter('completed')}
          >
            Completed
          </button>
        </div>
        <div>
          <button className="button" onClick={() => clearCompleted()}>
            Clear completed
          </button>
        </div>
      </div>
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array,
  setTodos: PropTypes.func.isRequired,
};

export default TodoList;
