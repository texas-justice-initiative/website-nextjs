import React, { Component } from 'react';
// import DeathsInCustody from '../components/DeathsInCustody'
import axios from 'axios';

class Explore extends Component {
  config = {};

  dataUrl = 'https://api.data.world/v0/datasets/tji/deaths-in-custody';

  static async getInitialProps() {
    const data = await axios
      .get(this.dataUrl, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OnNoZWFkc2NvdHQiLCJpc3MiOiJhZ2VudDpzaGVhZHNjb3R0OjpmMWI3YWE5MC1kY2UyLTQ4YTgtYWQyOS1hZTBjZDAzNDNlMzAiLCJpYXQiOjE1NTE3MjkzNDMsInJvbGUiOlsidXNlcl9hcGlfcmVhZCIsInVzZXJfYXBpX3dyaXRlIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZSwic2FtbCI6e319.CF9X3wuktVv221oWvTW8f2qICHYcHrKt2fs5up7fVYCEJgg2eBctQRIiX9sm10-56sJEGUgjs3upTJlfL8_E4w',
        },
      })
      .then(function(response) {
        console.log('Sup fools');
        console.log(response);
      })
      .catch(function(error) {
        console.log('No luck fools');
        console.log(error);
      });

    return { data };
  }

  render() {
    return <div>sup fools</div>;
  }
}

export default Explore;
