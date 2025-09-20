import "./App.css";
import OrderPizza from "../src/components/OrderPizza.jsx";
import Home from "../src/components/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/*<OrderPizza /> */}
      <Home />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
