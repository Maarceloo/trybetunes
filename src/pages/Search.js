import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistInput: '',
    artist: '',
    loading: false,
    albuns: [],
  };

  handleChange = (event) => {
    this.setState({ artistInput: event.target.value });
  };

  getArtist = async () => {
    const { artistInput } = this.state;
    this.setState({ loading: true }, async () => {
      const returnApi = await searchAlbumsAPI(artistInput);
      this.setState({
        albuns: returnApi,
        artist: artistInput,
        artistInput: '',
        loading: false,
      });
    });
  };

  render() {
    const { artistInput, artist, loading, albuns } = this.state;
    const CHAVE_BUTTON = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        {loading ? (
          <Loading />
        ) : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Banda / Artista"
              value={ artistInput }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ artistInput.length < CHAVE_BUTTON }
              onClick={ this.getArtist }
            >
              Pesquisar
            </button>
          </form>
        )}
        {albuns.length === 0 && <p>Nenhum álbum foi encontrado</p>}
        {albuns.length > 0 && <p>{`Resultado de álbuns de: ${artist}`}</p>}
        {albuns.length > 0
          && albuns.map((disco, index) => (
            <div key={ index }>
              <img src={ disco.artworkUrl100 } alt="imagem do disco" />
              <h3>{disco.collectionName}</h3>
              <h4>{disco.artistName}</h4>
              <Link
                data-testid={ `link-to-album-${disco.collectionId}` }
                to={ `/album/${disco.collectionId}` }
              />
            </div>
          ))}
      </div>
    );
  }
}

export default Search;
