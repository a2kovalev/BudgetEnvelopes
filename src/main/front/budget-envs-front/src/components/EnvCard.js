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
        this.env = props.env
        this.state = {
            bgColour : ""
        }
    }

    handleClick = () => {
        if (this.state.bgColour == "") {
            this.setState ({
                bgColour : "lightgray"
            })
        } else {
            this.setState({
                bgColour : ""
            })
        }
        this.props.showTransactions()
        this.props.setCurrentEnv(this.env)
        this.props.unselectEnv()
    }

    componentDidMount() {
        this.env = this.props.env
    }

    componentDidUpdate() {
        this.env = this.props.env
        this.reHighlight()
    }

    reHighlight = () => {
        if (this.state.bgColour == "" && this.props.selected) {
            this.setState({bgColour : "lightgray"})
        }
    }

    render() {
        console.log(this.showTransactions)
            return[<div className="EnvContainer">
                        <div className="EnvCard" style={{backgroundColor : this.state.bgColour}} onClick={this.handleClick}>
                            <p className="EnvName">{this.env.envelopeName}</p>
                            <p className="EnvBalance">{formatter.format(this.env.balance)}</p>
                        </div>
                    </div>];
        }
}
export default EnvCard