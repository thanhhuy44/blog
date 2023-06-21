import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routers";

function App() {
  return (
    <div className="dark">
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
