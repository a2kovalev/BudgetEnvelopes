import EnvService from "../services/EnvService";
import React from 'react';
import EnvCard from "./EnvCard";
import TransComponent from "./TransComponent";
import EnvCreation from "./EnvCreation";

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
            newEnvClicked : false
        }
    }

    setCurrentEnv = (newEnv) => {
        console.log("NEW ENV")
        console.log(newEnv.envelopeName)
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

    flipNewEnvClicked = () => {
        this.setState(prevState => ({
            newEnvClicked : !prevState.newEnvClicked
            })
        );
    }

    componentDidMount() {
        EnvService.getEnvelopes().then((response) => {
            console.log(`Envelope data:`);
            console.log(response.data)
            this.setState({envelopes : response.data});
        });
    }

    handleNewEnvClick = () => {
        this.setState(prevState => ({
            newEnvClicked : !prevState.newEnvClicked
        }))
    }

    render() {
       console.log("In render");
        return (
            <div>
                <h2>Envelopes</h2>
                {!this.state.newEnvClicked ? <button className = "NewEnvButton" onClick={this.handleNewEnvClick}> New Envelope</button> : null}
                {this.state.newEnvClicked ?  <EnvCreation newEnvClicked={this.flipNewEnvClicked} /> : null}
                <br></br>
                <br></br>
                {
                    this.state.envelopes.map (
                        env =><div className="EnvCardHolder">
                                <EnvCard env={env} currentEnv={this.setCurrentEnv} showTransactions={this.flipShowTransactions}/>
                            </div>
                    )
                } 
                {this.state.currentEnv != null && this.state.showTransactionsForEnv ? <TransComponent env={this.state.currentEnv}/> : null}
            </div>
        );
    }
}

export default EnvComponent