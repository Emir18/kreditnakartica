import React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/Input';

class App extends React.Component {
    render() {
        return (
            <div className="container">
            <h4>Unesite podatke kreditne kartice</h4>
                <Input />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);