import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./main/Login.js";
import Registration from "./main/Registration.js";
import Feed from "./main/Feed.js";
import Post from "./main/Post.js";
import Notification from "./notification/Notification.js";
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
    path: "/home",
    element: <Feed/>,
  },
  {
    path: "/post",
    element: <Post/>,
  },
  {
    path: "/notification",
    element: <Notification/>,
  },
])

function App() {
  return (
    <div className="App">
      <div>
      <RouterProvider router={router} />
      <ToastContainer />
      </div>
    </div>
  );
}

export default App;