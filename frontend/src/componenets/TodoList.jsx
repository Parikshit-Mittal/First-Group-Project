import React, { useEffect, useState } from 'react'
import Todo from './Todo'
import {
    completeTodo,
    createTodo,
    deleteTodo,
    getTodoById,
    getTodos,
    updateTodo,
} from '../api/api'

const TodoList = () => {
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        let isMounted = true
        const loadTodos = async () => {
            try {
                const data = await getTodos()
                if (isMounted) {
                    setTodos(Array.isArray(data) ? data : [])
                    setError('')
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to load todos')
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadTodos()
        return () => {
            isMounted = false
        }
    }, [])

    const handleCreate = async (event) => {
        event.preventDefault()
        if (!title.trim()) {
            setError('Please enter a title')
            return
        }

        setIsSubmitting(true)
        try {
            const created = await createTodo({
                title: title.trim(),
                description: description.trim(),
                completed: false,
            })

            let nextTodo = created
            if (created && created.id) {
                try {
                    const refreshed = await getTodoById(created.id)
                    nextTodo = refreshed || created
                } catch (err) {
                    nextTodo = created
                }
            }

            if (nextTodo) {
                setTodos((prev) => [nextTodo, ...prev])
            }
            setTitle('')
            setDescription('')
            setError('')
        } catch (err) {
            setError(err.message || 'Failed to create todo')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id) => {
        const previousTodos = todos
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
        try {
            await deleteTodo(id)
            setError('')
        } catch (err) {
            setTodos(previousTodos)
            setError(err.message || 'Failed to delete todo')
        }
    }

    const handleToggleComplete = async (todo) => {
        const nextCompleted = !todo.completed
        setTodos((prev) =>
            prev.map((item) =>
                item.id === todo.id ? { ...item, completed: nextCompleted } : item
            )
        )

        try {
            if (nextCompleted) {
                await completeTodo(todo.id)
            } else {
                await updateTodo(todo.id, { ...todo, completed: false })
            }
            setError('')
        } catch (err) {
            setTodos((prev) =>
                prev.map((item) =>
                    item.id === todo.id ? { ...item, completed: todo.completed } : item
                )
            )
            setError(err.message || 'Failed to update todo')
        }
    }

    return (
        <section className="mx-auto max-w-3xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Your Todos</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Track what you need to finish and stay on top of your day.
                </p>
            </div>
            <form
                onSubmit={handleCreate}
                className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="todo-title">
                        Title
                    </label>
                    <input
                        id="todo-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Add a new todo"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700" htmlFor="todo-description">
                        Description
                    </label>
                    <textarea
                        id="todo-description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        rows={3}
                        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Optional details"
                    />
                </div>
                <button
                    type="submit"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Add Todo'}
                </button>
            </form>
            {error && (
                <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                </div>
            )}
            {isLoading ? (
                <div className="text-sm text-slate-500">Loading todos...</div>
            ) : (
                <div className="space-y-3">
                    {todos.length === 0 ? (
                        <div className="text-sm text-slate-500">No todos yet.</div>
                    ) : (
                        todos.map((todo) => (
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                description={todo.description}
                                completed={todo.completed}
                                onDelete={() => handleDelete(todo.id)}
                                onToggleComplete={() => handleToggleComplete(todo)}
                            />
                        ))
                    )}
                </div>
            )}
        </section>
    )
}

export default TodoList
