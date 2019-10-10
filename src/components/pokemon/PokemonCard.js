import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: ""
  };
  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    // const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
    let imageUrl = '';
    if (pokemonIndex < 10) {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemonIndex}.png`;
    } else if (pokemonIndex < 100) {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemonIndex}.png`;
    } else {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIndex}.png`;
    }

    this.setState({ name, imageUrl, pokemonIndex });
  }
  render() {
    return (
      <div className="col-md-3 col-sm-5 mb-5 mx-1">
      <Link to={`Pokemon/${this.state.pokemonIndex}`} style={{textDecoration: 'none'}}>
          <div className="card p-3">
            <h4 className=" text-light">
              <span className="badge badge-danger">
                {this.state.pokemonIndex}
              </span>
            </h4>
            <img
              className="card-img-top"
              src={this.state.imageUrl}
              alt="Card image cap"
            />
            <div className="card-body">
              <h6 className="card-title text-white" style={{textTransform: 'capitalize'}}>{this.state.name}</h6>
            </div>
          </div>
      </Link>
        </div>
    );
  }
}
