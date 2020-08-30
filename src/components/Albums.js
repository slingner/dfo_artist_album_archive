import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Album from './Album';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
      albumObj: [],
      artistdata: this.props.location.state.artistdata,
      currentPage: 1,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(
      `https://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=${this.props.match.params.artistName}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong in fetching album data...');
        }
      })
      .then((data) => {
        this.setState({
          albumObj: data.album,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  renderAlbums() {
    const { albumObj } = this.state;
    const allAlbums = albumObj;
    let renderAlbumList = [];

    renderAlbumList =
      allAlbums !== null ? (
        allAlbums.map((item) => {
          return (
            <Album
              key={item.idAlbum}
              albumName={item.strAlbum}
              albumId={item.idAlbum}
              albumCover={item.strAlbumThumb}
              releaseYear={item.intYearReleased}
            />
          );
        })
      ) : (
        <p>oops! Nothing to show here</p>
      );
    return renderAlbumList;
  }
  render() {
    const { isLoading, error, artistdata, albumObj } = this.state;
    if (error) {
      return (
        <div className='Albums'>
          <p>{error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className='Albums'>
          <CircularProgress color='secondary' />
        </div>
      );
    }

    return (
      <section className='Albums'>
        <Button
          component={Link}
          to='/'
          color='secondary'
          style={{ border: '1px solid pink', margin: '15px' }}
        >
          <ion-icon
            style={{ fontSize: '25px', padding: '5px' }}
            name='arrow-back-outline'
          ></ion-icon>{' '}
          Back to Artist Search
        </Button>
        <div className='Albums-artist'>
          <div
            style={{ backgroundImage: `url(${artistdata.strArtistThumb})` }}
            className='Albums-artist-thumbnail'
          >
            &nbsp;
          </div>
          <div className='Albums-artist-info'>
            <h3>{artistdata.strArtist}</h3>
            <p>
              <b>Style:</b> {artistdata.strStyle ? artistdata.strStyle : 'NA'}
            </p>
            <p>
              <b>Genre:</b>
              {artistdata.strGenre ? artistdata.strGenre : 'NA'}
            </p>
            <p>
              <b>Country:</b>{' '}
              {artistdata.strCountry ? artistdata.strCountry : 'NA'}
            </p>
          </div>
        </div>
        <div className='Albums-listing'>
          <h2>{albumObj ? (albumObj.length > 0 ? `Albums` : '') : ''}</h2>
          {this.renderAlbums()}
        </div>
      </section>
    );
  }
}
export default Albums;
