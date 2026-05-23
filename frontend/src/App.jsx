import React from 'react'
import Header from './componenets/Header'
import TodoList from './componenets/TodoList'

const App = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-50 px-4 py-8">
        <TodoList />
      </main>
    </>
  )
}

export default App
