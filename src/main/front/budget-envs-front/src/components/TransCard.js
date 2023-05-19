import TransComponent from "./TransComponent";
import React from 'react';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

class TransCard extends React.Component {
  constructor(props) {
    super(props);
    this.tran = props.tran;
    this.state = {
      bgColour : ""
  }
  }

handleOnClick = () => {
  if (this.state.bgColour == "") {
    this.setState ({
        bgColour : "darkgrey"
    })
} else {
    this.setState({
        bgColour : ""
    })
}
  this.props.setTrans(this.tran)
  this.props.unselectTran()
}

componentDidUpdate() {
  this.tran = this.props.tran
}

  render() {
    return(
        <tr className="transRow" onClick={this.handleOnClick} style={{backgroundColor : this.state.bgColour}}>
          <td>{this.tran.date}</td>
          <td>{this.tran.name}</td>
          <td>{formatter.format(this.tran.amount)}</td>
        </tr>
    );
  }
}

export default TransCard