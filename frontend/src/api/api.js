const HOST = 'localhost'
const PORT = '5000'
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

export const createTodo = (todo) =>
    request('', {
        method: 'POST',
        body: JSON.stringify(todo),
    })

export const getTodos = () => request('')

export const getTodoById = (id) => request(`/${id}`)

export const updateTodo = (id, updates) =>
    request(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    })

export const deleteTodo = (id) =>
    request(`/${id}`, {
        method: 'DELETE',
    })

export const completeTodo = (id) =>
    request(`/${id}/complete`, {
        method: 'PATCH',
    })
