import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./main/Login.js";
import Registration from "./main/Registration.js";
import Feed from "./main/Feed.js";
import Post from "./main/Post.js";
import './App.css';

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
  {
    path: "/post",
    element: <Post/>,
  },
])

function App() {
  return (
    <div className="App">
      <div>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;