import React from "react";
import { Provider } from "react-redux";
import generateStore from "../../redux/store";
import Routes from "../../routes/Routes";

export default function App() {
  const store = generateStore();

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
};