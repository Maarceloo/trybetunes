import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    load: true,
    user: undefined,
  };

  componentDidMount = async () => {
    this.setState({
      user: await getUser(),
      load: false,
    });
  };

  render() {
    const { load, user } = this.state;
    if (load) return <Loading />;
    return (
      <header data-testid="header-component">
        <h2 data-testid="header-user-name">{user.name}</h2>
        <hr />
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <br />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <br />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <br />
        </nav>
      </header>
    );
  }
}

export default Header;
