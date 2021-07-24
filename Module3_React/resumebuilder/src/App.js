import Counter from "./Components/Counter"
import './App.css';
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
   <Provider store = {store}> 
     <div className="App">
    
   <Counter></Counter>
     
  </div>
 </Provider>
  );
}

export default App;
