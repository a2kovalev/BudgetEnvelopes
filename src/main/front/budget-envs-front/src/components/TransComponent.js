import EnvService from "../services/EnvService";
import React from 'react';
import TransCard from "./TransCard";
import TranCreation from "./TranCreation";

class TransComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            transactions : [],
            currentTransaction : null,
            newTranClicked : false
        }
        this.env = props.env;
    }

    componentDidMount() {
        this.componentDidCode()
    }

    componentDidUpdate() {
        this.env = this.props.env
        this.componentDidCode()
    }

    componentDidCode() {
        EnvService.getTransactionsForEnv(this.env.id).then((response) => {
            console.log(`Transaction data:`);
            console.log(response.data);
            this.setState({transactions : response.data});
        });
    }

    setCurrentTransaction = (newTran) => {
        this.setState({currentTransaction : newTran})
    }

    unselectTran = () => {
        if (this.state.currentTransaction != null) {
            this.setCurrentTransaction(null);
        }
    }

    handleNewTranClick = () => {
        this.setState(prevState => ({
            newTranClicked : !prevState.newTranClicked
        }))

    }

    handleDeleteTran = () => {
        EnvService.deleteTran(this.env.id, this.state.currentTransaction.id)
        this.unselectTran()
        this.componentDidUpdate()
    }

    render() {
        return(
            <div className="TransContainer">
                {this.state.newTranClicked == false ? <h3 className="TranLabel">Transactions for {this.env.envelopeName}</h3> : null}
                {this.state.currentTransaction == null && this.state.newTranClicked == false ?  <button onClick={this.handleNewTranClick}>Add Transaction</button> : null}
                {this.state.newTranClicked != false ? <TranCreation newTranClicked={this.handleNewTranClick} env={this.env}/> : null}
                {this.state.currentTransaction != null ? <button onClick={this.handleDeleteTran}>Delete Transaction</button> : null}
                <br></br>
                {this.state.currentTransaction != null && this.state.currentTransaction.note != null && this.state.currentTransaction.note != "" ? <p>{this.state.currentTransaction.name}: {this.state.currentTransaction.note}</p> : null}
                <br></br>
                <table className="TransListTable">
                    <tr className="TransListTopRow">
                      <th>Date</th>
                      <th>Name</th>
                      <th>Amount</th>
                    </tr>
                {
                    this.state.transactions.map(tran => 
                        <TransCard tran={tran} setTrans={this.setCurrentTransaction} unselectTran={this.unselectTran}/>
                    )
                }
                </table>
            </div>
        );
    }
}

export default TransComponent