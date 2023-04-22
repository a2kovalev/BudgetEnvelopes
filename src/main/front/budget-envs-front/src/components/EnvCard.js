import EnvService from "../services/EnvService";
import TransComponent from "./TransComponent";
import React, { useContext } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


class EnvCard extends React.Component {
    constructor(props) {
        super(props)
        // this.state={
        //     showTransactions : false
        // }
        this.env = props.env
    }

    handleClick = () => {
        // this.setState(prevState => ({
        //     showTransactions : !prevState.showTransactions
        //     })
        // );
        this.props.showTransactions()
        this.props.currentEnv(this.env)
    }

    render() {
        console.log(this.showTransactions)
            return[<div className="EnvAndTransContainer">
                        <div className="EnvCard" onClick={this.handleClick}>
                            <p className="EnvName">{this.env.envelopeName}</p>
                            <p className="EnvBalance">{formatter.format(this.env.balance)}</p>
                        </div>
                    </div>,
                    <div className="TransactionBody">
                        {/* {this.state.showTransactions ? <TransComponent env={this.env}/> : null} */}
                    </div>];
        }
}
export default EnvCard