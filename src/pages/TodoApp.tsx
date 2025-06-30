import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Math.random().toString(36).substr(2, 9),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos(prev => [...prev, todo])
      setNewTodo('')
      toast.success('Todo added successfully!')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    toast.success('Todo deleted successfully!')
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      ))
      setEditingId(null)
      setEditText('')
      toast.success('Todo updated successfully!')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
    toast.success('Completed todos cleared!')
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="section">
      <h1>Todo Application Testing</h1>
      <p>This page demonstrates a complete CRUD application with add, edit, delete, and mark as complete functionality.</p>

      <div className="grid">
        <div className="item">
          <h3>Add New Todo</h3>
          <form onSubmit={addTodo} data-testid="add-todo-form">
            <div className="form-group">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                data-testid="new-todo-input"
              />
            </div>
            <button type="submit" data-testid="add-todo-button">
              Add Todo
            </button>
          </form>
        </div>

        <div className="item">
          <h3>Filter Todos</h3>
          <div>
            <button 
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : ''}
              data-testid="filter-all"
            >
              All ({todos.length})
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'active' : ''}
              data-testid="filter-active"
            >
              Active ({activeCount})
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'active' : ''}
              data-testid="filter-completed"
            >
              Completed ({completedCount})
            </button>
          </div>
        </div>
      </div>

      {todos.length > 0 && (
        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>Todo List ({filteredTodos.length})</h3>
            {completedCount > 0 && (
              <button 
                onClick={clearCompleted}
                style={{ background: '#e74c3c' }}
                data-testid="clear-completed"
              >
                Clear Completed
              </button>
            )}
          </div>

          <div data-testid="todo-list">
            {filteredTodos.map(todo => (
              <div 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                data-testid={`todo-${todo.id}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  data-testid={`toggle-${todo.id}`}
                />
                
                {editingId === todo.id ? (
                  <div style={{ display: 'flex', flex: 1, gap: '10px' }}>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                      onBlur={() => saveEdit(todo.id)}
                      autoFocus
                      data-testid={`edit-input-${todo.id}`}
                    />
                    <button 
                      onClick={() => saveEdit(todo.id)}
                      data-testid={`save-${todo.id}`}
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      data-testid={`cancel-${todo.id}`}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                    <span data-testid={`todo-text-${todo.id}`}>
                      {todo.text}
                    </span>
                    <div>
                      <button 
                        onClick={() => startEdit(todo)}
                        data-testid={`edit-${todo.id}`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
                        style={{ background: '#e74c3c', marginLeft: '10px' }}
                        data-testid={`delete-${todo.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {todos.length === 0 && (
        <div className="section">
          <p>No todos yet. Add one above to get started!</p>
        </div>
      )}

      <div className="section">
        <h3>Todo App Features</h3>
        <ul>
          <li><strong>Add Todo:</strong> Create new todo items</li>
          <li><strong>Toggle Complete:</strong> Mark todos as complete/incomplete</li>
          <li><strong>Edit Todo:</strong> Modify existing todo text</li>
          <li><strong>Delete Todo:</strong> Remove individual todos</li>
          <li><strong>Filter Todos:</strong> View all, active, or completed todos</li>
          <li><strong>Clear Completed:</strong> Remove all completed todos at once</li>
          <li><strong>Todo Counters:</strong> Track total, active, and completed counts</li>
        </ul>
      </div>
    </div>
  )
}

export default TodoApp 