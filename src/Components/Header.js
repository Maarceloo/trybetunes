import React from 'react';
// import { getUser } from '../services/userAPI';
// import Loading from './Loading';

class Header extends React.Component {
  // state = {
  //   load: true,
  // }

  // recuperaNome = async () => {
  //   await getUser();
  //   this.setState({
  //     load: false,
  //   });
  // };

  render() {
    return (
      <header data-testid="header-component">
        <h1>
          CABEÇALHO
          {}
        </h1>
      </header>
    );
  }
}

export default Header;
