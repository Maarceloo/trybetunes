import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    musicas: [],
  };

  getMusicsApi = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState(
      {
        artistName: musics[0].artistName,
        albumName: musics[0].collectionName,
      },
      () => {
        this.setState({ musicas: musics.filter((item) => item.trackId) });
      },
    );
  };

  componentDidMount = () => {
    this.getMusicsApi();
  };

  render() {
    const { artistName, albumName, musicas } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <h3 data-testid="album-name">{`Banda:  ${albumName}`}</h3>
        <h4 data-testid="artist-name">{`Artista:  ${artistName}`}</h4>
        {musicas.map((item) => <MusicCard key={ item.trackId } music={ item } />)}
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
