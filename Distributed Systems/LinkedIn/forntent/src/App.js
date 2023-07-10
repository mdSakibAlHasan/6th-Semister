import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./main/Login.js";
import Registration from "./main/Registration.js";
import Feed from "./main/Feed.js";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/registration",
    element: <Registration/>,
  },
  {
    path: "/newsFeed",
    element: <Feed/>,
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