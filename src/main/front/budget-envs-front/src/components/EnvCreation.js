import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import EnvService from "../services/EnvService";

class EnvCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            envName : "",
            initialBal : 0.00
        }
    }

    handleEnvNameChange = (event) => {
        this.setState(prevState => ({
            envName : event.target.value
        }))
    }

    handleEnvBalChange = (event) => {
        this.setState(prevState => ({
            initialBal : parseFloat(event.target.value.substring(1))
        }))
    }

    handleSubmit = (event) => {
        var envData = {
            "envelopeName" : this.state.envName,
            "balance" : this.state.initialBal
        }
        EnvService.postEnvelope(envData)
       // alert("Form submitted with env name: " + envData.envelopeName + " and balance: " + envData.balance)
        event.preventDefault()
        this.props.newEnvClicked()
    }

    render() {
        return(
            <form onSubmit={/*EnvService.postEnvelope(this.state)*/ this.handleSubmit}>
                <h3>New Envelope Creation</h3>
                <label for="envNameInput"> Envelope Name </label><br></br>
                <input type="text" id="envNameInput" onChange={this.handleEnvNameChange}/><br></br>
                <br></br>
                <label for="envBalInput"> Initial Balance </label><br></br>
                <CurrencyInput
                    id="envBalInput"
                    name="envBalInput"
                    placeholder="$0.00"
                    prefix="$"
                    decimalsLimit={2}
                    onChange={this.handleEnvBalChange}
                /> <br></br>
                <br></br>
                <button type="submit" className='CreateNewEnvConfirm' onClick="handleEnvCreateClick">Create Envelope</button>
            </form>
        );
    }

}

export default EnvCreation