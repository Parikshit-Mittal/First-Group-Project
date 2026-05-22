const HOST = 'localhost'
const PORT = '8080'
const BASE_URL = `http://${HOST}:${PORT}/api/todos`

const request = async (path = '', options = {}) => {
    const response = await fetch(`${BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    })

    if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Request failed')
    }

    if (response.status === 204) {
        return null
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
        return response.json()
    }

    return null
}

const normalizeTodo = (todo) => {
    if (!todo || typeof todo !== 'object') {
        return todo
    }

    const completed = typeof todo.completed === 'boolean' ? todo.completed : Boolean(todo.status)
    const { status, ...rest } = todo
    return { ...rest, completed }
}

const normalizeTodos = (data) => (Array.isArray(data) ? data.map(normalizeTodo) : data)

const toApiTodo = (todo) => {
    if (!todo || typeof todo !== 'object') {
        return todo
    }

    const status = typeof todo.completed === 'boolean' ? todo.completed : todo.status
    const { completed, ...rest } = todo
    return { ...rest, status }
}

export const createTodo = (todo) =>
    request('', {
        method: 'POST',
        body: JSON.stringify(toApiTodo(todo)),
    }).then(normalizeTodo)

export const getTodos = () => request('').then(normalizeTodos)

export const getTodoById = (id) => request(`/${id}`).then(normalizeTodo)

export const updateTodo = (id, updates) =>
    request(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(toApiTodo(updates)),
    }).then(normalizeTodo)

export const deleteTodo = (id) =>
    request(`/${id}`, {
        method: 'DELETE',
    })

export const completeTodo = (id) =>
    request(`/${id}/complete`, {
        method: 'PATCH',
    }).then(normalizeTodo)
