import React from 'react';
import CurrencyInput from 'react-currency-input-field';
import EnvService from "../services/EnvService";

class TranEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newName : props.tran.name,
            newAmount : props.tran.amount,
            newNote : props.tran.note
        }
    }

    handleTranRename = (event) => {
        if (event.target.value != null && event.target.value != "") {
            this.setState({
                newName : event.target.value
            })
        }
    }

    handleAmountChange = (event) => {
        if (event.target.value != null && event.target.value != "" && event.target.value != "$") {
            this.setState({
                newAmount : parseFloat(event.target.value.substring(1))
            })
        }
    }

    handleTranNoteChange = (event) => {
        if (event.target.value != null && event.target.value != "") {
            this.setState({
                newNote : event.target.value
            })
        }
    }

    handleSubmit = (event) => {
        var tranData = {
            "name" : this.state.newName,
            "note" : this.state.newNote,
            "amount" : this.state.newAmount,
            "cur" : this.props.tran.cur
        }
        EnvService.updateTransaction(tranData, this.props.tran.id, this.props.envID)
        event.preventDefault()
        this.props.tran.name = this.state.newName
        this.props.tran.amount = this.state.newAmount
        this.props.tran.note = this.state.newNote
        this.props.done()
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label for="tranNameInput"> New Name </label><br></br>
                <input type="text" id="tranNameInput" onChange={this.handleTranRename}/><br></br>
                <br></br>
                <label for="amountInput"> Amount </label><br></br>
                <CurrencyInput
                    id="amountInput"
                    name="amountInput"
                    placeholder={this.props.tran.amount}
                    prefix="$"
                    decimalsLimit={2}
                    onChange={this.handleAmountChange}
                />
                <br></br>
                <label for="tranNoteInput"> New Note </label><br></br>
                <input type="text" id="tranNoteInput" onChange={this.handleTranNoteChange}/><br></br>
                <br></br>
                <button type="submit" className='EditTranConfirm' onClick="handleSubmit">Finish Edit</button>
            </form>
        );
    }
}

export default TranEdit