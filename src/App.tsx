import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Weather } from './components/WeatherApp/Weather';
import TodoList from './components/Todo/TodoList';
function App() {
    
    return (
        <div className="App" data-testid="app-component-test-id">
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/todo/" element={<TodoList />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
