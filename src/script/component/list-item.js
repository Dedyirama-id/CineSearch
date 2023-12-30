import axios from 'axios';
import { baseUrl } from '../data/api-ref.js';
import { detailOpt } from '../data/data-option.js';
import starIcon from '../../svg/star-half-stroke-regular.svg';
const { merge } = require('webpack-merge');
import { baseImgUrl } from '../data/api-ref.js';

class Item extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.type = this.getAttribute('type') || null;
    }

    set item(item) {
        this._item = item;
        this.render();
    }

    set detailElement(element) {
        this._detailElement = element;
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                :host {
                    width: min-content;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    border-radius: 4px;
                }

                :host(:hover) {
                    box-shadow: rgba(255, 255, 255, 0.25) 0px 1px 1px, rgba(255, 255, 255, 0.13) 0px 0px 1px 1px;
                    transition: 0.3s;
                }

                * {
                    margin: 8px;
                }

                .poster {
                    aspect-ratio: 2/3;
                    width: 150px;
                    background-color: rgba(255, 255, 255, 0.25);
                    border-radius: 8px;
                }

                h2 {
                    font-size: 16px;
                    font-weight: normal;
                }

                .rating {
                    display: flex;
                    color: #eab308;
                    height: 100%;
                    justify-content: end;
                    align-items: end;
                }

                .star-icon {
                    // filter: invert(1) sepia(100%) saturate(10000%);
                    fill: white; 
                    width: 18px;
                    color: white;
                    margin: 0;
                    margin-right: 8px;
                }
            </style>
            
            <img class="poster" src="${baseImgUrl}/w185${this._item.poster_path}" alt="">
            <h2>${(this.type == 'tv') ? this._item.name : this._item.title} (${(this.type == 'tv') ? this._item.first_air_date.substring(0, 4) : this._item.release_date.substring(0, 4)})</h2>
            <p class="rating"><img class="star-icon" src="${starIcon}" fill="white">${this._item.vote_average.toFixed(2)} / 10</p>
            `;
        this.addEventListener('click', () => {
            axios
                .request(merge(detailOpt, { url: `${baseUrl}/${this.id}` }))
                .then(function (response) {
                    const mainImg = document.querySelector('main-img');
                    mainImg.detail = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        });
    }
}
customElements.define('list-item', Item);