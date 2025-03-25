import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboad';
import HookDemo from './components/HookDemo';
import Login from './components/Login';
import SaveButton from './components/SaveButton';
import StatusBar from './components/StatusBar';



function App() {
  // const [count, setCount] = useState(0)
  // const [email, setEmail] =useState("");

  return (
    <>

<Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statusbar" element={<StatusBar />} />
        <Route path="/hookdemo" element={<HookDemo />} />
        <Route path="/savebutton" element={<SaveButton />} />
        {/* Default route */}
        <Route path="/" element={<Login />} /> 
      </Routes>
    </Router>

    {/* <Login></Login> */}
    {/* <Courses title="CS418" description="Web Programming">
      <h3>React Class - Project Setup</h3>
      <p>Testing children props</p>

    </Courses>

    
    <Courses title="CS471" description="Operating System"></Courses>
    
    <Courses title="CS432" description="Web Science"></Courses>
     <Images></Images>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
