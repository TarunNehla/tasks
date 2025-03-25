import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return;
    const task = await createTask({ ...newTask, completed: false });
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
  };

  const handleEditTask = async () => {
    if (!editingTask.title.trim() || !editingTask.description.trim()) return;
    const updatedTask = await updateTask(editingTask.id, editingTask);
    setTasks(tasks.map((t) => (t.id === editingTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  const handleToggleTask = async (task) => {
    const updatedTaskData = {
      ...task,
      completed: !task.completed,
    };
    const updatedTask = await updateTask(task.id, updatedTaskData);
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
  };
  

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>

      {/* Task Creation Card */}
      <div className="card w-full max-w-4xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task title..."
            className="input input-bordered w-full"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <textarea
            placeholder="Task description..."
            className="textarea textarea-bordered w-full h-24"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button className="btn btn-primary w-full" onClick={handleCreateTask}>
            Add Task
          </button>
        </div>
      </div>


      <div className="w-full max-w-4xl text-left p-3">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      </div>

      <div className="w-full max-w-4xl ">
        <table className="table w-full table-fixed">
          <thead>
            <tr>
              <th className="w-16">✔</th>
              <th className="w-1/4">Title</th>
              <th className="w-1/2">Description</th>
              <th className="w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="align-top">
                <td className="p-2">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                  />
                </td>

                <td className="p-2">
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    />
                  ) : (
                    <p className={`break-words ${task.completed ? "line-through text-gray-500" : ""}`}>
                      {task.title}
                    </p>
                  )}
                </td>

                <td className="p-2">
                  {editingTask && editingTask.id === task.id ? (
                    <textarea
                      className="textarea textarea-bordered w-full h-24"
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({ ...editingTask, description: e.target.value })
                      }
                    />
                  ) : (
                    <p className="break-words">{task.description}</p>
                  )}
                </td>

                {/* Actions Column */}
                <td className="p-2 flex flex-col gap-2">
                  {editingTask && editingTask.id === task.id ? (
                    <button className="btn btn-success btn-sm" onClick={handleEditTask}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingTask(task)}
                    >
                      Edit
                    </button>
                  )}
                  <button className="btn btn-error btn-sm" onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
