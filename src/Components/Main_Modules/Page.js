import React, { useState } from "react";
import "../../Assets/Styles/Common/common.scss";
import "../../Assets/Styles/Avant-garde/navigation.scss";
import { Container, makeStyles, Box } from "@material-ui/core";
import Navigation from "./Navigation";
import Start from "./Start";
import ScheduleView from "./ScheduleView";

import Auth from "./Auth";
import Workspace from "../Dispatcher_Modules/Workspace";
import Footer from "./Footer";
import Error404 from "../Errors/Error404";
import Dev from "../Errors/Dev";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  box: {
    // background: "#e4e4e4"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    justifyContent: "space-between",
  },
}));
const Page = ({ check }) => {
  const [darkThemeStatus, setDarkThemeStatus] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkThemeStatus ? "dark" : "light",
    },
  });
  const classes = useStyle();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={classes.box}>
        <Container className={classes.container}>
          <BrowserRouter>
            <Navigation
              setThemeStatus={setDarkThemeStatus}
              themeStatus={darkThemeStatus}
            />
            <Switch>
              <Route exact path="/" component={Start} />
              <Route path="/schedules">
                <ScheduleView />
              </Route>
              <Route path="/documentation">
                <Dev />
              </Route>
              <Route path="/auth">
                <Auth />
              </Route>

              <Route path="/workspace">
                {check ? <Workspace /> : <Redirect to="/auth" />}
              </Route>

              <Route path="*">
                <Error404 />
              </Route>
            </Switch>

            <Footer />
          </BrowserRouter>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    check: state.admin.login_check,
  };
};
export default connect(mapStateToProps, null)(Page);
