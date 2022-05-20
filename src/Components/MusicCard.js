import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, isTrue, favorite } = this.props;
    const { trackName, previewUrl, trackId } = music;
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
              checked={ isTrue }
              onClick={ favorite(music) }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </li>
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
