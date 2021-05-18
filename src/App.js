import React from "react";
import Page from "./Components/Main_Modules/Page";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Page />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
