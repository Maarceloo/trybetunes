import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    artista: '',
  };

  handleChange = (event) => {
    this.setState({ artista: event.target.value });
  };

  render() {
    const { artista } = this.state;
    const CHAVE_BUTTON = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Banda / Artista"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artista.length < CHAVE_BUTTON }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
