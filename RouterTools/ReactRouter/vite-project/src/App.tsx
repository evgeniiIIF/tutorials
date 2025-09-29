import './App.scss'
import { RouterProvider } from 'react-router'
import { router } from './router/router'

function App() {

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
