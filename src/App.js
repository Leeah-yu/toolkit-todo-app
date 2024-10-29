import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTodo, deleteTodo, toggleTodo, editTodo } from './store/todoSlice';

function App() {


  const dispatch = useDispatch();

  const todos = useSelector(state => state.todos);
  console.log(todos);
  
  const [text, settext] = useState('');
  const [editId, seteditId] = useState(null);
  const [editText, seteditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      dispatch(
        addTodo(text)
      )
      settext('');
    }

  }

  const handleDelete = (id) => {
    dispatch(
      deleteTodo(id)
    )
  }

  const handleEditStart = (id, text) => {
    seteditId(id);
    seteditText(text);
  }

  const handEditCancel = () => {
    seteditId(null);
    seteditText('');
  }

  const handleEditSave = () => {
    if(editText.trim() !== '') {
      dispatch(
        editTodo({
          id: editId,
          newText: editText
        })
      )
      seteditId(null);
      seteditText('');
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <input 
      value={text} 
      onChange={e => settext(e.target.value)}/>
      <button type='submit'>Add Todo</button>
        </form>
      <ul>
        {
          todos.map(
            todo => (
              <li key={todo.id}>
                {todo.id === editId ?
                  <>
                   <input type='text' value={editText} onChange={(e) => seteditText(e.target.value)}/>
                   <button onClick={handleEditSave}>Save</button>
                   <button onClick={handEditCancel}>Cancel</button>
                  </>
                  :
                  <>
                <input 
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span>
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button><br></br>
              </>
                }

              </li>
            )
          )
        }
      </ul>
    </div>
  );
}

export default App;
