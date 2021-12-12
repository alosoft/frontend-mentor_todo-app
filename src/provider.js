import React from 'react';


export const ThemeContext = React.createContext();

const todoIntitialState = [
    {
        task: 'Jog around the park 3x',
        completed: false
    },
    {
        task: '10 minutes meditation',
        completed: false
    },
    {
        task: 'Read for 1 hour',
        completed: false
    },
    {
        task: 'Pick up groceries',
        completed: false
    },
    {
        task: 'Complete Todo App on Frontend Mentor',
        completed: false
    }
]
export default function ThemeProvider(props) {

    const [theme, setTheme] = React.useState('light');

    const [todos, setTodos] = React.useState(todoIntitialState);

    const themeObject = {
        light: {
            color: '#000000',
            background: '#ffffff',
            background_dark: '#ffffff'
        },
        dark: {
            color: '#ffffff',
            background: '#25273c',
            background_dark: '#161722'
        }
    }

    const currentTheme = () => theme === 'light' ? themeObject.light : themeObject.dark;

    return <ThemeContext.Provider value={[theme, setTheme, currentTheme, todos, setTodos]}>
        {props.children}
    </ThemeContext.Provider>
}

