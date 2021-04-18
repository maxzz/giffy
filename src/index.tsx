import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import HookedSearch from './hooked-serach';

function App() {
    return (
        <StrictMode>
            <HookedSearch />
        </StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));

