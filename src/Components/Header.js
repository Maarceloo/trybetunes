import React from 'react';
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
        <h2 data-testid="header-user-name">
          {user.name}
        </h2>
      </header>
    );
  }
}

export default Header;
