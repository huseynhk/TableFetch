// import PostList from "./components/PostList";
// import AppData from "./components/AppData";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/ThemeContext";
import ApiDataViewer from "./components/ApiDataViewer";


function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <NavBar/>
      {/* <AppData/> */}
     {/* <PostList/> */}
     <ApiDataViewer/>
     </ThemeProvider>
    </div>
  );
}

export default App;
