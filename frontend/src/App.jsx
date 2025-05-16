import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Home from "./pages/Home"
import Post from './pages/Post'
import ViewPost from './pages/ViewPost'
import Staff  from './pages/staff'
const App = () => {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/home" element={<Home />}/>
      <Route path="/post" element={<Post />}/>
      <Route path="/viewPost" element={<ViewPost />}/>
      <Route  path='/staff' element={<Staff />}/>
    </Routes>
  </Router>
  )
}

export default App
