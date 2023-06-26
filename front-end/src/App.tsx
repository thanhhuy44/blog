import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routers";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "./interfaces/redux";

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className={`${theme} duration-300`}>
      <Router>
        <Routes>
          {routes.map((router, index) => {
            const Page = router.component;
            const Layout = router.layout;
            return (
              <Route
                key={index}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
                path={router.path}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
