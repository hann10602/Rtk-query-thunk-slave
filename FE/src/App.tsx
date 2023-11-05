import "./App.css";
import ReduxToolkit from "./components/redux-toolkit";
import RTKQuery from "./components/rtk-query";
import RTKMutation from "./components/rtk-query/RTKMutation";

function App() {
  return (
    <>
      <RTKMutation />
      <RTKQuery />
    </>
  );
}

export default App;
