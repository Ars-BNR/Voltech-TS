import { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Store from "./store/Store";

const store = new Store();

export const Context = createContext({
  store,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context.Provider
    value={{
      store,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
