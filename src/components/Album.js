import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
    };
  }

  render() {
    return (
      <div className='Albums-results'>
        <div className='Albums-results-header'>
          {this.props.albumCover ? (
            <img src={this.props.albumCover} alt='music cover' />
          ) : (
            <ion-icon
              style={{
                fontSize: '55px',
                color: 'purple',
                paddingLeft: '40px',
              }}
              name='musical-note-outline'
            ></ion-icon>
          )}
        </div>
        <div className='Albums-results-info'>
          <p className='name'>{this.props.albumName}</p>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  albumName: PropTypes.string,
  albumId: PropTypes.string,
  albumCover: PropTypes.string,
  releaseYear: PropTypes.string,
};
export default Album;
