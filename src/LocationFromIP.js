// dependencies / things imported
import { LitElement, html, css } from 'lit';
import { UserIP } from './UserIP.js'; 

export class LocationFromIP extends LitElement {
  static get tag() {
    return 'location-from-ip';
  }

  constructor() {
    super(); //not sure what this does
    this.UserIpInstance = new UserIP();
    this.locationEndpoint = 'https://freegeoip.app/json/';
    this.long = 10.305385;
    this.lat = 77.923029;
  }

  static get properties() {
    return {
      long: {type: Float, reflect: true}, 
      lat: {type: Float, reflect: true},
    };
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) { // still not sure what "super" does
      super.firstUpdated(changedProperties);
    }
    this.getGEOIPData();
  }

  async getGEOIPData() {
    const IPClass = new UserIP();
    const userIPData = await IPClass.updateUserIP();
    return fetch(this.locationEndpoint + userIPData.ip)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return false;
      })
      .then(data => {
        console.log(data);
        this.long = data.long,
        this.lat= data.lat;
        return data;
      });
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        iframe {
          height: 500px;
          width: 500px;
        }
      `,
    ];
  }

  render() {
    // this function runs every time a properties() declared variable changes
    // this means you can make new variables and then bind them this way if you like
    const url = `https://maps.google.com/maps?q=${data.long},${data.lat}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    return html`<iframe title="Where you are" src="${url}"></iframe> `;
  }
}

customElements.define(LocationFromIP.tag, LocationFromIP);
