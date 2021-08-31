import "./App.css";
import AppRouter from "./router/AppRouter";
// import {ThemeProvider, createTheme} from '@material-ui/core/styles'

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Gowun Dodum'
//   }
// })

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
