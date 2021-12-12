import './App.css';
import CheckBox from './components/CheckBox/CheckBox';
import Todo from './components/Todo/Todo';
import Moon from './images/icon-moon.svg';
import Sun from './images/icon-sun.svg';
import React, { useContext } from 'react';
import { ThemeContext } from './provider';
import { useMediaQuery } from '@mui/material';
import DarkMobile from './images/bg-mobile-dark.jpg';
import LightMobile from './images/bg-mobile-light.jpg';
import LightDesktop from './images/bg-desktop-light.jpg';
import DarkDesktop from './images/bg-desktop-dark.jpg';

function App() {
  const [theme, setTheme, currentTheme, todos, setTodos] = useContext(ThemeContext);
  // console.log('building App')
  const isMobile = useMediaQuery('(max-width: 56rem)');
  const isLight = theme === 'light';
  const style = currentTheme();
  const [addTodo, setAddTodo] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [filtered, setFiltered] = React.useState('all');
  const [load, setLoad] = React.useState('');

  function getActive(filter) {
    return filter.toLowerCase() === filtered.toLowerCase() ? 'button-active' : null;
  }

  function reload() {
    setLoad('')
  }

  const flex = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const all_todo_length = todos.length;
  const active_todo_length = todos.filter(item => !item.completed).length;
  const completed_todo_length = todos.filter(item => item.completed).length;

  //set background color on body tag
  document.getElementById('content').style.background = style.background_dark
  return <div style={{
    // backgroundColor: style.background_dark,
    backgroundImage: `url(${isMobile ? isLight ? LightMobile : DarkMobile : isLight ? LightDesktop : DarkDesktop})`,
    backgroundSize: 'contain'
  }} className="home" >
    <div className="body">
      <div className='body__head'>
        <h1 className="body__head_logo">Todo</h1>
        <img onClick={() => setTheme(isLight ? 'dark' : 'light')} className="body__head_switch" src={isLight ? Moon : Sun} alt='theme switch' />
      </div>
      <div style={style} className="body__add_todo">
        <CheckBox key={'add_todo'} checked={checked} clicked={setChecked} />
        <form className="body__add_todo_form" style={style} onSubmit={(e) => {
          e.preventDefault();
          setTodos(prevTodos => {
            prevTodos.unshift({ task: addTodo, completed: checked })
            return prevTodos;
          })
          setAddTodo('');
          setChecked(false);
        }}>
          <input value={addTodo} onChange={(event) => setAddTodo(event.target.value)} className='body__add_todo__input' placeholder='Create a new todo...' name='todo' />
        </form>
      </div>
      <div style={{ ...style, boxShadow: theme === 'light' ? '#0000008c 0px 3px 15px 0px' : '0px 10px 12px 3px #0000008c' }} className='body__todos'>
        {
          filtered === 'all' ?
            todos.map((todo, index) => <>
              <Todo reload={reload} key={todo.task} todo={todo} />
              <div className='body__todos_divider'></div>
            </>)
            : filtered === 'active' ?
              todos.filter(item => !item.completed).map((todo, index) => <>
                <Todo reload={reload} key={todo.task} todo={todo} />
                <div className='body__todos_divider'></div>
              </>) :
              todos.filter(item => item.completed).map((todo, index) => <>
                <Todo reload={reload} key={todo.task} todo={todo} />
                <div className='body__todos_divider'></div>
              </>)
        }
        <div style={{
          ...style
        }} className='body__actions'>
          {filtered === 'all' ?
            todos.length > 0 ?
              <p className='body_actions_items-left'>{todos.length} items left</p>
              : <span></span>
            : filtered === 'active' ?
              todos.filter(item => !item.completed).length > 0 ?
                <p className='body_actions_items-left'>{todos.filter(item => !item.completed).length} items left</p>
                : <span></span>
              :
              todos.filter(item => item.completed).length > 0 ?
                <p className='body_actions_items-left'>{todos.filter(item => item.completed).length} items left</p>
                : <span></span>
          }
          <div style={
            isMobile ? {
              ...style,
              ...flex,
              boxShadow: theme === 'light' ? '#0000008c 0px 3px 15px 0px' : '0px 10px 12px 3px #0000008c',
              bottom: filtered === 'all' ?
                all_todo_length < 4 ?
                  '-50%'
                  : '-20%'
                : filtered === 'active' ?
                  active_todo_length < 4 ?
                    '-50%'
                    : '-20%'
                  :
                  completed_todo_length < 4 ?
                    '-50%'
                    : '-20%'

            } : null} className='body__actions_filter'>
            <button onClick={() => setFiltered('all')} className={` ${getActive('all')} body__actions_button_all`}>All</button>
            <button onClick={() => setFiltered('active')} className={` ${getActive('active')} body__actions_button_active`}>Active</button>
            <button onClick={() => setFiltered('completed')} className={` ${getActive('completed')} body__actions_button_completed`}>Completed</button>
          </div>
          {filtered === 'all' ?
            todos.length > 0 ?
              <button onClick={() => setTodos(prevTodos => prevTodos.filter(item => !item.completed))} className='body__actions_button_clear'>Cler Completed</button>
              : <span></span>
            : filtered === 'active' ?
              todos.filter(item => !item.completed).length > 0 ?
                <button onClick={() => setTodos(prevTodos => prevTodos.filter(item => !item.completed))} className='body__actions_button_clear'>Cler Completed</button>
                : <span></span>
              :
              todos.filter(item => item.completed).length > 0 ?
                <button onClick={() => setTodos(prevTodos => prevTodos.filter(item => !item.completed))} className='body__actions_button_clear'>Cler Completed</button>
                : <span></span>
          }
        </div>
      </div>
    </div>
  </div >;

}

export default App;
