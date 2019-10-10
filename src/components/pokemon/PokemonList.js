import React, { Component } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";

export default class PokemonList extends Component {
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/?limit=151",
    pokemon: []
  };
  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({ pokemon: res.data.results });
    // res.data.results
  }
  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
          {this.state.pokemon.length < 1 ? (
            <div class="spinner-border text-danger" role="status" style={{width: '10em', height: '10em', margin: ' 5em auto 5em auto'}}>
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            this.state.pokemon.map(pokemon => (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))
          )}
        </div>
      </React.Fragment>
    );
  }
}
