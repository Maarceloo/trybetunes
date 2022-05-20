import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.favorite = this.favorite.bind(this);
    this.state = {
      artistName: '',
      albumName: '',
      musicas: [],
      songsFavorites: [],
      loading: false,
    };
  }

  getMusicsApi = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({
      artistName: musics[0].artistName,
      albumName: musics[0].collectionName,
      musicas: musics.filter((item) => item.trackId),
    });
  };

  favorite = async ({ target }) => {
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(JSON.parse(target.name));
      this.musicasFavoritas();
    }
  };

  musicasFavoritas = async () => {
    const returnApi = await getFavoriteSongs();
    this.setState({
      songsFavorites: returnApi,
      loading: false,
    });
  };

  componentDidMount = async () => {
    this.getMusicsApi();
    this.musicasFavoritas();
  };

  render() {
    const { artistName, albumName, musicas, songsFavorites, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <h3 data-testid="album-name">{`Banda:  ${albumName}`}</h3>
        <h4 data-testid="artist-name">{`Artista:  ${artistName}`}</h4>
        {loading ? (
          <Loading />
        ) : (
          musicas.map((item) => (
            <MusicCard
              isTrue={ songsFavorites.some(
                (music) => music.trackId === item.trackId,
              ) }
              key={ item.trackId }
              music={ item }
              favorite={ this.favorite }
            />
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
