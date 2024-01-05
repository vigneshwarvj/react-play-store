import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Todo from './Components/Todo/Todo';
import Stopwatch from './Components/Stopwatch/Stopwatch';
import NumbersCount from './Components/NumbersCount/NumbersCount';
import TicTacToe from './Components/TicTacToe/TicTacToe';
import PomodoroTimer from './Components/PomorodoTimer/PomorodoTimer';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="" element={<Home />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/stopwatch" element={<Stopwatch />} />
      <Route path="/numberscount" element={<NumbersCount />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
      <Route path="/pomorodotimer" element={<PomodoroTimer />} />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
