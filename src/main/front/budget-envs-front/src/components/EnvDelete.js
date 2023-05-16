import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import EnvService from "../services/EnvService";

class EnvDelete extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return (
            <button>Delete Envelope: {this.props.env}</button>
        );
    }

}

export default EnvDelete