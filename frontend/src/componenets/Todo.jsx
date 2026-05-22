import React from 'react'

// This component will repesent one item in the list of todos. It will be used in the TodoList component and will be styled using tailwind css. It will have a checkbox to mark the todo as completed and a delete button to delete the todo a title and a description of the todo it will receive the todo as prop and will have following parameters in the todo object
// id: number
// title: string
// description: string
// completed: boolean

const Todo = ({ id, title, description, completed, onDelete, onToggleComplete }) => {
    return (
        <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <input
                id={`todo-${id}`}
                type="checkbox"
                checked={completed}
                onChange={onToggleComplete}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="min-w-0 flex-1">
                <label
                    htmlFor={`todo-${id}`}
                    className={`block text-sm font-semibold text-slate-900 ${completed ? 'line-through text-slate-400' : ''}`}
                >
                    {title}
                </label>
                <p className={`mt-1 text-sm text-slate-600 ${completed ? 'line-through text-slate-400' : ''}`}>
                    {description}
                </p>
            </div>
            <button
                type="button"
                className="inline-flex items-center rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                aria-label={`Delete ${title}`}
                onClick={onDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default Todo
