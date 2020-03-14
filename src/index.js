import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';

import HookedSearch from './hooked-serach';

function App() {
    return (
        <div>
        <HookedSearch />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));

