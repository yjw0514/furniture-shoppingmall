import './App.css';
import { dbService } from './firebase';

function App() {
  const submit = (e) => {
    console.log('dd');
    dbService.collection('todo').add({
      text: '청소',
    });
  };
  return (
    <div className='App'>
      <h1>Todo App</h1>
      <button onClick={submit}>추가</button>
    </div>
  );
}

export default App;
