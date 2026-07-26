import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
      <Provider store={store}>
      <AppProvider>
          <Header />
          <Home />
          <Cart />
      </AppProvider>   
      </Provider>

  );
};

export default App;

