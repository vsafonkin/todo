import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./configureStore";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import App from "./components/app/App.jsx";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <DragDropContextProvider backend={HTML5Backend}>
      <App />
    </DragDropContextProvider>
  </Provider>,
  document.getElementById("root")
);
