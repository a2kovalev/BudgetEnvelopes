import EnvService from "../services/EnvService";
import React from 'react';

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
            transactionsForEnv : []
        }
    }

    componentDidMount() {
        EnvService.getEnvelopes().then((response) => {
            console.log(`Envelope data:`);
            console.log(response.data)
            this.setState({envelopes : response.data});
        });
        EnvService.getTransactions().then((response) => {
            console.log(`Transaction data:`);
            console.log(response.data)
            this.setState({transactions : response.data});
        });
    }

    transactionsForEnv(env) {
        console.log("The given env");
        console.log(env);
        var transForEnv = []
        this.state.transactions.map (t => {
            console.log("T");
            console.log(t.name);
            console.log("E");
            console.log(t.envelope);
            if (t.envelope != null && t.envelope.envelopeName == env.envelopeName) {
                transForEnv.push(t);
            }
        })
        console.log("TransForEnv");
        console.log(transForEnv);
        return transForEnv;
    }

    render() {
       console.log("In render");
        return (
            <div>
                <h2>Envelopes</h2>
                <body>
                    {
                        this.state.envelopes.map (
                            env =><div>
                                    <h3>{env.envelopeName}</h3>
                                    <h3>{formatter.format(env.balance)}</h3>
                                    <h3>Transactions:</h3>
                                    <table className="transTable">
                                        <tr>
                                            <th>Date</th>
                                            <th>Transaction</th>
                                            <th>Amount</th>
                                        </tr>
                                        {this.transactionsForEnv(env).map (t =><>
                                        <tr>
                                            <td>{t.date}</td>
                                            <td>{t.name}</td>
                                            <td>{formatter.format(t.amount)}</td>
                                        </tr></>)}
                                        
                                    </table>
                                </div>
                        )
                    }    
                    {
                        // this.state.transactions.map (
                        //     tran => <div>
                        //             <h3>{tran.name}</h3>
                        //             <h3>{tran.envelope.id}</h3>
                        //         </div>
                        // )
                    }
                </body>
            </div>
        );
    }
}

export default EnvComponent