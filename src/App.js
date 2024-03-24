import "./App.css";
import React from "react";
import WinboxComponent from "./WinboxComponent"; // 適切なパスを設定
import WinboxTabulatorComponent from "./WinboxTabulatorComponent"; // 適切なパスを設定
import { ChakraProvider, Button, Select } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Click the button below to open a Winbox window.</p>
        <ChakraProvider>
          <WinboxComponent />
          <WinboxTabulatorComponent />
        </ChakraProvider>
      </header>
    </div>
  );
}

export default App;
