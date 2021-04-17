import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import HookedSearch from './hooked-serach';

function App() {
    return (
        <StrictMode>
            <div>
                <HookedSearch />
            </div>
        </StrictMode>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));

