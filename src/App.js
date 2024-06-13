import React, { useState } from "react";

import Table from "./components/Table";
import Search from "./components/Search";
import PlaceContextProvider from "./context";

const App = () => {
  const [countries] = useState([...[
    {
      id: 1,
      name: "Poland",
      language: "Polish",
      capital: "Warsaw",
    },
    {
      id: 2,
      name: "Bulgaria",
      language: "Bulgarian",
      capital: "Sofia",
    },
    {
      id: 3,
      name: "Hungary",
      language: "Hungarian",
      capital: "Budapest",
    },
    {
      id: 4,
      name: "Moldova",
      language: "Moldovan",
      capital: "Chișinău",
    },
    {
      id: 5,
      name: "Austria",
      language: "German",
      capital: "Vienna",
    },
    {
      id: 6,
      name: "Lithuania",
      language: "Lithuanian",
      capital: "Vilnius",
    },
  ]]);
  return (
    <main>
      <PlaceContextProvider>
        <Search />
        <Table data={countries} rowsPerPage={4} />
      </PlaceContextProvider>
    </main>
  );
};

export default App;