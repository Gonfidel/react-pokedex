import React, { Component } from "react";
import Axios from "axios";
import PokemonStatBar from "./PokemonStatBar";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4f3a2d",
  dragon: "755edf",
  electric: "fcbc17",
  fairy: "f481f4",
  fighting: "82351d",
  fire: "E7380C",
  flying: "A383F7",
  ghost: "606082",
  grass: "74C236",
  ground: "D38357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6"
};

export default class Pokemon extends Component {
  state = {
    pokemonUrl: "",
    name: "",
    pokemonIndex: "",
    imageUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: ""
    },
    height: "",
    weight: "",
    types: []
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    const pokemonResponse = await Axios.get(pokemonUrl);
    const pokemonSpeciesResponse = await Axios.get(pokemonSpeciesUrl);
    const description = pokemonSpeciesResponse.data.flavor_text_entries.find(
      text => {
        return text.language.name === "en";
      }
    );

    const weight = (pokemonResponse.data.weight / 10).toFixed(0);
    const height = (pokemonResponse.data.height * 0.328).toFixed(1);
    const name = pokemonResponse.data.name;
    // const imageUrl = pokemonResponse.data.sprites.front_default;
    // const imageUrl = `https://img.pokemondb.net/artwork/${name}.jpg`;
    let imageUrl = "";
    if (pokemonIndex < 10) {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemonIndex}.png`;
    } else if (pokemonIndex < 100) {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemonIndex}.png`;
    } else {
      imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIndex}.png`;
    }

    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    pokemonResponse.data.stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat.base_stat;
          break;
        case "attack":
          attack = stat.base_stat;
          break;
        case "defense":
          defense = stat.base_stat;
          break;
        case "speed":
          speed = stat.base_stat;
          break;
        case "special-attack":
          specialAttack = stat.base_stat;
          break;
        case "special-defense":
          specialDefense = stat.base_stat;
          break;
      }
    });

    const types = pokemonResponse.data.types.map(type => (
      <span
        style={{ backgroundColor: `#${TYPE_COLORS[type.type.name]}` }}
        className="badge badge-pill mr-2"
      >
        {type.type.name}
      </span>
    ));

    this.setState({
      name,
      imageUrl,
      stats: { hp, attack, defense, speed, specialAttack, specialDefense },
      types,
      description,
      height,
      weight
    });
  }

  render() {
    return (
      <div className="col-md-8 col-sm-10 mx-auto mt-5">
        <div className="card-lg align-content-center mx-auto">
          {this.state.name === "" ||
          this.state.description.flavor_text === "" ? (
            <div
              class="spinner-border text-danger"
              role="status"
              style={{
                width: "10em",
                height: "10em",
                margin: " 5em auto 5em auto"
              }}
            >
              <span class="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              <h3
                className="card-header"
                style={{
                  height: "65px",
                  backgroundColor: "#191e24",
                  borderBottomColor: "rgba(230,230,230,0.18)",
                  borderBottomWidth: "1px",
                  borderRadiusTopLeft: "10px",
                  borderRadiusTopRight: "10px"
                }}
              >
                <span
                  style={{
                    float: "left",
                    color: "#FFF",
                    textTransform: "capitalize"
                  }}
                >
                  {this.state.name}
                </span>
                <span style={{ float: "right" }}>{this.state.types}</span>
              </h3>
              <div className="card-body">
                <div className="row">
                  <img
                    src={this.state.imageUrl}
                    alt="Pokemon-Image"
                    className="card-img-top-lg col-6"
                  />
                  <span
                    className="text-white lead col-6"
                    style={{ fontWeight: "300" }}
                  >
                    <p>{this.state.description.flavor_text}</p>

                    <div className="row">
                      <span className="col-6">
                        {`Height: ${this.state.height}'`}
                      </span>
                      <span className="col-6">
                        {`Weight: ${this.state.weight} lbs.`}
                      </span>
                    </div>
                  </span>
                </div>

                <table style={{ width: "100%" }}>
                  <PokemonStatBar statName={`HP`} stat={this.state.stats.hp} />
                  <PokemonStatBar
                    statName={`Attack`}
                    stat={this.state.stats.attack}
                  />
                  <PokemonStatBar
                    statName={`Defense`}
                    stat={this.state.stats.defense}
                  />
                  <PokemonStatBar
                    statName={`Speed`}
                    stat={this.state.stats.speed}
                  />
                  <PokemonStatBar
                    statName={`Special Attack`}
                    stat={this.state.stats.specialAttack}
                  />
                  <PokemonStatBar
                    statName={`Special Defense`}
                    stat={this.state.stats.specialDefense}
                  />
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}
