import './App.css'

function App() {

  const copyright = new Date().getFullYear();
  return (
    <>
      <div>
        <a>Ich bin Martin Neubauer</a>
      </div>
        <p>

     &copy; Martin Neubauer - {copyright}

        </p>
      
    </>
  )
}

export default App
