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
  }
  render() {
    return(
      <table className="TransListTable">
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
        <tr>
          <td>{this.tran.date}</td>
          <td>{this.tran.name}</td>
          <td>{formatter.format(this.tran.amount)}</td>
        </tr>
      </table>
    );
  }
}

export default TransCard