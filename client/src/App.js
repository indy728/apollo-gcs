
import React from "react";
import {FileFormList, FileSelector} from './components/Upload';
import {Download} from './components/Download'

const App = () => {
  return (
    <>
      <Download />
      <FileFormList />
      <FileSelector />
    </>
  );
}

export default App;
