import React, { Component } from "react";

export default class PokemonStatBar extends Component {
  render() {
    return (
        <tr>
          <td style={{ width: "12vw" }}>{`${this.props.statName}: `}</td>
          <td>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${(this.props.stat / 155) * 100}%` }}
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {this.props.stat}
              </div>
            </div>
          </td>
        </tr>
    );
  }
}
