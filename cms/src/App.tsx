import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privatePages, publicPages } from "./router";
import AuthLayout from "./layouts/AuthLayout";
import "./App.css";

function App() {
  return (
    <div>
      {
        <Router>
          <Routes>
            {publicPages.map((page, index) => {
              const Page = page.component;
              const Layout = page.layout || AuthLayout;
              return (
                <Route
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  path={page.path}
                  key={index}
                ></Route>
              );
            })}
            {privatePages.map((page, index) => {
              const Page = page.component;
              const Layout = page.layout || AuthLayout;
              return (
                <Route
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  path={page.path}
                  key={index}
                ></Route>
              );
            })}
          </Routes>
        </Router>
      }
    </div>
  );
}

export default App;
