import EnvService from "../services/EnvService";
import TransComponent from "./TransComponent";
import React from 'react';
import EnvCard from "./EnvCard";

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
    }

    render() {
       console.log("In render");
        return (
            <div>
                <h2>Envelopes</h2>
                <body className="EnvBody">
                    {
                        this.state.envelopes.map (
                            env =><div>
                                    <EnvCard env={env}/>
                                </div>
                        )
                    } 
                </body>
            </div>
        );
    }
}

export default EnvComponent