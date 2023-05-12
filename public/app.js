const todoContainer = document.querySelector(".todos");

const newTodoForm = document.querySelector(".new-todo-form");

newTodoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.target);

  fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: data.get("text") }),
  })
    .then((res) => res.json())
    .then((todo) => {
      todoContainer.append(createTodoElement(todo));
      newTodoForm.querySelector("input").value = "";
      newTodoForm.querySelector("input").focus();
    });
});

const createTodoElement = (todo) => {
  const todoForm = document.createElement("form");
  todoForm.className = "todo-form";
  const textInput = document.createElement("input");
  textInput.name = "text";
  textInput.value = todo.text;
  todoForm.append(textInput);

  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: data.get("text") }),
    })
      .then((res) => res.json())
      .then((todo) => {
        todoLi.replaceChild(todoText, todoForm);
        todoText.innerText = todo.text;
      });
  });

  const todoText = document.createElement("span");
  todoText.textContent = todo.text;
  todoText.addEventListener("click", () => {
    todoLi.replaceChild(todoForm, todoText);
    textInput.focus();
  });

  const todoLi = document.createElement("li");
  todoLi.className = "todo";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => {
    fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    }).then(() => {
      todoLi.remove();
    });
  });

  todoLi.append(deleteBtn, todoText);

  return todoLi;
};

fetch("/api/todos")
  .then((res) => res.json())
  .then((todos) => {
    for (let todo of todos) {
      todoContainer.append(createTodoElement(todo));
    }
  });
