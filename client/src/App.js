
import React from "react";
// import { Upload } from "./Upload";
import Files from "./components/Files/Files";
import Upload from "./components/Upload/Upload";

const App = () => {
  return (
    <div>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
      <Upload />
      <Files />
    </div>
  );
}

export default App;
