import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import EnvService from "../services/EnvService";

class EnvNameChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newName : ""
        }
    }

    handleEnvNameChange = (event) => {
        this.setState(prevState => ({
            newName : event.target.value
        }))
    }

    handleSubmit = (event) => {
        var envData = {
            "envelopeName" : this.state.newName,
            "balance" : this.props.env.balance
        }
        EnvService.updateEnvelope(envData, this.props.env.id)
        event.preventDefault()
        this.props.env.envelopeName = this.state.newName
        this.props.done()
    }

    render() {
        return(
            <form onSubmit={/*EnvService.postEnvelope(this.state)*/ this.handleSubmit}>
                <label for="envNameInput"> New Name </label><br></br>
                <input type="text" id="envNameInput" onChange={this.handleEnvNameChange}/><br></br>
                <br></br>
                <button type="submit" className='CreateNewEnvConfirm' onClick="handleEnvCreateClick">Rename Envelope</button>
            </form>
        );
    }

}

export default EnvNameChange