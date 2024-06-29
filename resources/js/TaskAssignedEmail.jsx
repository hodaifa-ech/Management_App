// resources/js/Emails/TaskAssignedEmail.jsx

import React from 'react';

const TaskAssignedEmail = ({ task, user }) => {
  return (
    <html>
      <head>
        <title>New Task Assigned</title>
      </head>
      <body>
        <h1>{task.name}</h1>
        <p>{task.description}</p>
        <p>Due Date: {task.due_date}</p>
        <p>Status: {task.status}</p>
        <p>Assigned To: {user.name}</p>
      </body>
    </html>
  );
};

export default TaskAssignedEmail;
