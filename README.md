## INTRODUCTION

This is a Todo List Application Backend , allowing users to create, read, update, and delete todos. The backend handles the database operations, while the frontend interacts with the backend through a set of API endpoints.

## Features

- Create new todos
- Read and display the list of todos
- Update existing todos
- Delete todos
- Complete todos
- Authentication using JWT
- Persistent Storage with local storage for todos

## Project Structure

```bash
Backend/
├── config/
│ ├── database.js
├── controller/
│ ├── auth.js
│ ├── task.js
├── middlewares/
│ ├── auth.js
├── middlewares/
│ ├── Todo.js
│ ├── User.js
├── routes/
│ ├── todo.js
│ ├── user.js
└── index.js
```

## Requirement

- Node.js
- visual studio Code

## Run

```bash
npm run dev
```

## Description

- Login or Signup

- Access the Login or Signup page to authenticate.

- Add Todos

- Use the form on the main page to add new todos. Each todo will appear in the list.

- Manage Todos

- Complete a todo by clicking the check button.
- Edit a todo by clicking the edit button, which opens the form populated with the todo's details.
- Delete a todo by clicking the trash button.
- Read More / Show Less

- Long descriptions in todos can be expanded or collapsed using the "Read More" / "Show Less" functionality.

# Task-manager-User API

- User Login Task: POST /api/v1/login
- User Signup: POST /api/v1/signup

# Task-manager-Task API

- Create Task: POST /api/v1/createTask
- Get Tasks: GET /api/v1/getTodo
- Update Task: PUT /api/v1/updateTodo/:todoId
- Delete Task: DELETE /api/v1/deleteTodo/:todoId