const todoFormElement = document.querySelector('#todo-management form');
const todosListElement = document.getElementById('todos-list');
const id=document.getElementById("text");

let editedTodoElement;

async function loadTodos() {
  let response;
  try {
    response = await fetch('http://localhost:3000');
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const responseData = await response.json();
  const todos = responseData.data;

  for (const todo of todos) {
    createTodoListItem(todo.message, todo._id);
  }
}

function createTodoListItem(todoText, todoId) {
  const newTodoItemElement = document.createElement('li');
  newTodoItemElement.dataset.todoid = todoId; // data-todoid

  const todoTextElement = document.createElement('p');
  todoTextElement.textContent = todoText;

  const editTodoButtonElement = document.createElement('button');
  editTodoButtonElement.textContent = 'Edit';
  editTodoButtonElement.addEventListener('click', startTodoEditing);

  const deleteTodoButtonElement = document.createElement('button');
  deleteTodoButtonElement.textContent = 'Delete';
  deleteTodoButtonElement.addEventListener('click', deleteTodo);

  const todoActionsWrapperElement = document.createElement('div');
  todoActionsWrapperElement.appendChild(editTodoButtonElement);
  todoActionsWrapperElement.appendChild(deleteTodoButtonElement);

  newTodoItemElement.appendChild(todoTextElement);
  newTodoItemElement.appendChild(todoActionsWrapperElement);

  todosListElement.appendChild(newTodoItemElement);
}

async function createTodo(todoText) {
  let response;

  try {
    response = await fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify({
        message: todoText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  const responseData = await response.json();
  const todoId = responseData._id;

  id.value="";

  createTodoListItem(todoText, todoId);
}

async function updateTodo(newTodoText) {
  const todoId = editedTodoElement.dataset.todoid; // data-todoid
  let response;

  try {
    response = await fetch('http://localhost:3000/' + todoId, {
      method: 'PATCH',
      body: JSON.stringify({
        newText: newTodoText,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  editedTodoElement.firstElementChild.textContent = newTodoText;

  todoFormElement.querySelector('input').value = '';
  editedTodoElement = null;
}

async function deleteTodo(event) {
  const clickedButtonElement = event.target;
  const todoElement = clickedButtonElement.parentElement.parentElement;
  const todoId = todoElement.dataset.todoid;

  let response;

  try {
    response = await fetch('http://localhost:3000/' + todoId, {
      method: 'DELETE',
    });
  } catch (error) {
    alert('Something went wrong!');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong!');
    return;
  }

  todoElement.remove();
}

function saveTodo(event) {
  event.preventDefault();

  const formInput = new FormData(event.target);
  const enteredTodoText = formInput.get('text');

  if (!editedTodoElement) {
    // We're adding a new todo
    createTodo(enteredTodoText);
  } else {
    // We're updating an existing todo
    updateTodo(enteredTodoText);
  }
  id.value="";
}

function startTodoEditing(event) {
  const clickedButtonElement = event.target;
  editedTodoElement = clickedButtonElement.parentElement.parentElement; // the <li>
  const currentText = editedTodoElement.firstElementChild.textContent;

  todoFormElement.querySelector('input').value = currentText;
}

todoFormElement.addEventListener('submit', saveTodo);

loadTodos();