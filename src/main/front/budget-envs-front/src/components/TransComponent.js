import EnvService from "../services/EnvService";
import React from 'react';
import TransCard from "./TransCard";

class TransComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            transactions : []
        }
        this.env = props.env;
    }

    componentDidMount() {
        EnvService.getTransactionsForEnv(this.env.id).then((response) => {
            console.log(`Transaction data:`);
            console.log(response.data);
            this.setState({transactions : response.data});
        });
    }


    render() {
        return(
            <div>
                <h3 className="TranLabel">Transactions for {this.env.envelopeName}</h3>
                {
                    this.state.transactions.map(tran => 
                        <TransCard tran={tran}/>
                    )
                }
            </div>
        );
    }
}

export default TransComponent