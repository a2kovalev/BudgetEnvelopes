import EnvService from "../services/EnvService";
import TransComponent from "./TransComponent";
import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


class EnvCard extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            showTransactions : false
        }
        this.env = props.env
    }

    handleClick = () => {
        this.setState(prevState => ({
            showTransactions : !prevState.showTransactions
            })
        );
    }

    render() {
        console.log(this.showTransactions)
                return(<div>
                            <div className="EnvCard" onClick={this.handleClick}>
                                <p className="EnvName">{this.env.envelopeName}</p>
                                <p className="EnvBalance">{formatter.format(this.env.balance)}</p>
                            </div>
                            {this.state.showTransactions ? <TransComponent env={this.env}/> : null}
                        </div>
                                    
        );
    }
}
export default EnvCard