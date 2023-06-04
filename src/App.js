// import PostList from "./components/PostList";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeContext";
import AppData from "./components/AppData";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <NavBar/>
      <AppData/>
     {/* <PostList/> */}
     </ThemeProvider>
    </div>
  );
}

export default App;
