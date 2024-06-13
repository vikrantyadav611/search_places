import React from "react";
import Table from "./components/Table";
import Search from "./components/Search";
import PlaceContextProvider from "./context";

const App = () => {
  return (
    <main>
      <PlaceContextProvider>
        <Search />
        <Table rowsPerPage={3} />
      </PlaceContextProvider>
    </main>
  );
};

export default App;