import EnvService from "../services/EnvService";
import React from 'react';
import EnvCard from "./EnvCard";
import TransComponent from "./TransComponent";
import EnvCreation from "./EnvCreation";
import EnvDelete from "./EnvDelete";
import EnvNameChange from "./EnvNameChange";

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

class EnvComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            envelopes:[],
            transactions: [],
            transactionsForEnv : [],
            currentEnv : null,
            showTransactionsForEnv : false,
            newEnvClicked : false,
            renameEnvClicked : false
        }
    }

    setCurrentEnv = (newEnv) => {
        this.setState(prevState => ({
            currentEnv : newEnv
            })
        )
    }

    flipShowTransactions = () => {
        this.setState(prevState => ({
            showTransactionsForEnv : !prevState.showTransactionsForEnv
            })
        );
    }

    flipRenameClicked = () => {
        this.setState(prevState => ({
            renameEnvClicked : !prevState.renameEnvClicked
            })
        );
    }

    unselectEnv = () => {
        if (this.state.currentEnv != null) {
            this.setCurrentEnv(null);
        }
    }

    componentDidMount() {
        this.componentDidCode()
    }

    componentDidCode() {
        EnvService.getEnvelopes().then((response) => {
            console.log(`Envelope data:`);
            console.log(response.data)
            this.setState({envelopes : response.data});
        });
    }

    componentDidUpdate() {
        this.componentDidCode()
    }

    handleNewEnvClick = () => {
        this.setState(prevState => ({
            newEnvClicked : !prevState.newEnvClicked
        }))
    }

    handleRenameEnv = () => {
        this.setState(prevState => ({
            renameEnvClicked : !prevState.renameEnvClicked
        }))
    }

    doneRenameEnv = () => {
        this.handleRenameEnv()
    }

    handleDeleteEnv = () => {
        EnvService.deleteEnvelope(this.state.currentEnv.id)
        this.flipShowTransactions()
        this.unselectEnv()
        this.componentDidUpdate()
    }

    handleResetEnv = () => {
        EnvService.resetEnvelope(this.state.currentEnv.id)
        this.componentDidUpdate()
    }

    render() {
       console.log("In render");
        return (
            <div>
                <h2>Envelopes</h2>
                {!this.state.newEnvClicked && this.state.currentEnv == null ? <button className = "NewEnvButton" onClick={this.handleNewEnvClick}> New Envelope</button> : null}
                {this.state.newEnvClicked ?  <EnvCreation newEnvClicked={this.handleNewEnvClick} /> : null}
                {this.state.currentEnv != null && this.state.showTransactionsForEnv ? <button className = "DeleteEnvButton" onClick={this.handleDeleteEnv}>Delete Envelope</button> : null}
                {this.state.currentEnv != null && this.state.showTransactionsForEnv ? <button className = "ResetEnvButton" onClick={this.handleResetEnv}>Reset Balance</button> : null}
                {this.state.currentEnv != null ? <button className = "RenameEnvButton" onClick={this.handleRenameEnv}>Rename</button> : null}
                {this.state.renameEnvClicked ? <EnvNameChange env={this.state.currentEnv} done={this.doneRenameEnv} /> : null}
                <br></br>
                <br></br>
                {
                    this.state.envelopes.map (
                        env =><div className="EnvCardHolder">
                                <EnvCard env={env} unselectEnv={this.unselectEnv} setCurrentEnv={this.setCurrentEnv} showTransactions={this.flipShowTransactions}/>
                            </div>
                    )
                } 
                {this.state.currentEnv != null && this.state.showTransactionsForEnv ? <TransComponent env={this.state.currentEnv}/> : null}
            </div>
        );
    }
}

export default EnvComponent