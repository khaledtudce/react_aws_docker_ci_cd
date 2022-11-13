import Login from "./component/Login/Login";

function App() {
  return (
    <div>
      <Login />
      <div>Learn React</div>
      <div>Hello {process.env.REACT_APP_NAME}</div>
    </div>
  );
}

export default App;
