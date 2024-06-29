<!DOCTYPE html>
<html>
<head>
    <title>New Task Assigned</title>
</head>
<body>
    <h1>{{ $task['name'] }}</h1>
    <p>{{ $task['description'] }}</p>
    <p>Due Date: {{ $task['due_date'] }}</p>
    <p>Status: {{ $task['status'] }}</p>
</body>
</html>
