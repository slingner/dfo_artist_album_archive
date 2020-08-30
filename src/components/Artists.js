import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistObj: [],
      query: '',
      isLoading: false,
      error: null,
    };
  }

  handleSearchChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  fetchArtists(event) {
    const { query } = this.state;
    if (query.trim().length > 0) {
      this.setState({ isLoading: true });
      fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php?s=${query}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Something went wrong ...');
          }
        })
        .then((data) => {
          this.setState({
            query: '',
            artistObj: data.artists,
            isLoading: false,
          });
        })
        .catch((error) =>
          this.setState({ error, isLoading: false, query: '' })
        );
    } else {
      event.preventDefault();
      return false;
    }
  }
  renderArtists() {
    const { artistObj } = this.state;
    const allArtists = artistObj;

    let renderArtists = [];
    renderArtists =
      allArtists !== null ? (
        allArtists.map((data) => {
          const AlbumLink = React.forwardRef((props, ref) => (
            <Link
              to={{
                pathname: `/albums/${data.strArtist}`,
                state: { artistdata: data },
              }}
              {...props}
              ref={ref}
            />
          ));
          return (
            <div key={data.idArtist} className='Artists-results'>
              <div
                style={{ backgroundImage: `url(${data.strArtistThumb})` }}
                className='Artists-header'
              >
                &nbsp;
              </div>
              <h3 className='name'>{data.strArtist}</h3>
              <div className='Artists-info'>
                <Button
                  size='small'
                  color='secondary'
                  variant='contained'
                  component={AlbumLink}
                >
                  {data.strArtist}'s albums
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p>oops! No artist found</p>
      );
    return renderArtists;
  }
  render() {
    const { query, isLoading, error } = this.state;
    if (error) {
      return (
        <div className='Artists'>
          <p>{error.message}</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className='Artists'>
          <CircularProgress color='secondary' />
        </div>
      );
    }

    return (
      <section className='Artists'>
        <h4 className='Artists-title'>Find Your Artist: </h4>
        <form noValidate autoComplete='off' className='Artists-form'>
          <TextField
            id='artist'
            label='Artist name'
            value={query}
            onChange={this.handleSearchChange}
            margin='normal'
            fullWidth={true}
          />
          <Button
            variant='contained'
            color='secondary'
            onClick={this.fetchArtists.bind(this)}
            type='submit'
          >
            Search
          </Button>
        </form>
        <div>{this.renderArtists()}</div>
      </section>
    );
  }
}
export default Artists;
