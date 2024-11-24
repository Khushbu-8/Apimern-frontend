import {BrowserRouter,Routes,Route} from 'react-router-dom'
import View from './Pages/View'
import Add from './Pages/Add'
import Edit from './Pages/Edit'

function App() {

  

  return (
  <>
   <div align='center'>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<View />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
    </BrowserRouter>
   </div>
  </>
  )
}

export default App
