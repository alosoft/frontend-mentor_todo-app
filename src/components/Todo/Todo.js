import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../provider';
import CheckBox from '../CheckBox/CheckBox';
import './Todo.css';
import IconCross from '../../images/icon-cross.svg';

const Todo = ({ todo, reload }) => {
    // console.log('mark todo')
    const [theme, seTheme, currentTheme, todos, setTodos] = useContext(ThemeContext);
    const style = currentTheme();
    const [refresh, setRefresh] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    function onMark(checked) {
        setRefresh(!refresh);
        setTodos(prevTodo => {
            let currentTodo = prevTodo.filter(item => item.task === todo.task);
            // console.log(currentTodo)
            // console.log(prevTodo)
            if (currentTodo.length > 0) {
                currentTodo[0].completed = checked
            }
            return prevTodo
        })
        reload('');
    }
    function deleteTodo() {
        setTodos(prevTodo => {
            let copied = [];
            for (let i = 0; i < prevTodo.length; i++) {
                if (prevTodo[i].task !== todo.task) {
                    copied.push(prevTodo[i])
                }
            }
            // console.log(copied)
            return copied;
        })
    }
    // console.log(`todo: ${todo.task} and is ${todo.completed}`)
    return (
        <div onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            style={style} className="body__todos_item">
            <div class="body__todos_item_main">
                <CheckBox key={todo.task} checked={todo.completed} clicked={onMark} />
                <p className={`${todo.completed ? 'completed' : ''} body__todos_item_text`}>{todo.task ?? 'Please add some text'}</p>
            </div>
            {showDelete ?
                <img onClick={deleteTodo} class="body__todos_item_delete" src={IconCross} alt='delete todo' />
                : <span></span>}
        </div>
    )
}

export default Todo
// 0209462110