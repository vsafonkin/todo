import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import App from "./components/app/App.jsx";
import DragDrop from "./components/hoc/DnD.jsx";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <DragDrop>
      <App />
    </DragDrop>
  </Provider>,
  document.getElementById("root")
);
