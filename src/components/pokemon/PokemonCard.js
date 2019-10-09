import React, { Component } from "react";

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: ""
  };
  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
    this.setState({ name, imageUrl, pokemonIndex });
  }
  render() {
    return (
      <div class="col-md-3 col-sm-6 mb-5 mx-3">
        <div className="card">
          <h5 className=" text-white">{this.state.PokemonIndex}</h5>
          <img className="card-img-top" src={this.state.imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title text-white">{this.state.name}</h5>
          </div>
        </div>
      </div>
    );
  }
}
