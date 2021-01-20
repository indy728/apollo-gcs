
import React from "react";
import {FileFormList, FileSelector} from './components/Upload';
import {SongsList} from './components/Download';

const App = () => {
  return (
    <>
      <SongsList />
      <FileFormList />
      <FileSelector />
    </>
  );
}

export default App;
