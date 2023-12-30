class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }


  get value() {
    return this.shadowDOM.querySelector('#search-element').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 32px;
          height: 32px;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        p {  
          padding: 8px 16px;
          border-radius: 8px;
          background-color: #e36414;
          font-weight: bold;
          letter-spacing: 0.5px;
          text-align: center;
          line-height: 16px;
          cursor: pointer;
        }

        #search-input {
          display: flex;
          width: 100%;
          border-radius: 8px;
          border: #e36414 solid 2px;
          height: 100%;
        }

        #search-button {
          padding: 4px 8px;
          margin: 4px;
          background-color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
          color: #040d12;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }

        #search-element {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: none;
          outline: none;
          box-shadow: none;
          width: 100%;
          background-color: #ffffff00;
          height: 100%;
          padding-left: 8px;
          color: white;
        }

        #search-element:focus #search-element:active {
          background-color: #ffffff00;
        }

        #search-button {
          font-style: normal;
        }
      </style>

      <p>CineSearch.</p>
      <form action="" id="search-input">
          <i id="search-button">Go</i>
          <input type="text" id="search-element" placeholder="Find movie or series...">
      </form>
    `;

    this.shadowDOM.querySelector('#search-button').addEventListener('click', this._clickEvent);
    this.shadowDOM.querySelector('#search-element').addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this._clickEvent();
      }
    });
  }
}

customElements.define('app-bar', AppBar);