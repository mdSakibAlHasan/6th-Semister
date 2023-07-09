import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./main/Login.js";
import Registration from "./main/Registration.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
])

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        
        <h1>Hellow</h1>
      </header> */}
      <div>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
