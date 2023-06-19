import React, { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div>
      <h1 className="dark:text-red-500">hihaaaaai</h1>
    </div>
  );
}

export default App;
