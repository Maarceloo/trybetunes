import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  favorite = async () => {
    const { music } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(music);
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { loading } = this.state;
    return (
      <ul>
        <li>
          {trackName}
          <br />
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label htmlFor="fav">
            Favorita
            <input
              name="fav"
              type="checkbox"
              onClick={ this.favorite }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </li>
        {loading && <Loading />}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
