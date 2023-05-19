import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import EnvService from "../services/EnvService";

class TranCreation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            amount : 0.00,
            note : ""
        }
    }

    handleNameChange = (event) => {
        this.setState(prevState => ({
            name : event.target.value
        }))
    }

    handleNoteChange = (event) => {
        this.setState(prevState => ({
            note : event.target.value
        }))
    }

    handleAmountChange = (event) => {
        this.setState(prevState => ({
            amount : parseFloat(event.target.value.substring(1))
        }))
    }

    handleSubmit = (event) => {
        var tranData = {
            "name" : this.state.name,
            "amount" : this.state.amount,
            "note" : this.state.note,
            "cur" : "USD"
        }
        EnvService.postTransaction(this.props.env.id, tranData)
        event.preventDefault()
        this.props.newTranClicked()
    }

    handleCancel = () => {
        this.props.newTranClicked()
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>New Transaction</h3>
                <label for="nameInput"> Transaction Name </label><br></br>
                <input type="text" id="nameInput" onChange={this.handleNameChange}/><br></br>
                <br></br>
                <label for="amountInput"> Amount </label><br></br>
                <CurrencyInput
                    id="amountInput"
                    name="amountInput"
                    placeholder="$0.00"
                    prefix="$"
                    decimalsLimit={2}
                    onChange={this.handleAmountChange}
                /> <br></br>
                <br></br>
                <label for="noteInput"> Note </label><br></br>
                <input type="text" id="noteInput" onChange={this.handleNoteChange}/><br></br><br></br>
                <button type="submit" className='CreateNewTranConfirm'>Submit Transaction</button>
                <button type="cancel" className='cancelAddTransaction' onClick={this.handleCancel}>Cancel</button>
            </form>
        );
    }

}

export default TranCreation