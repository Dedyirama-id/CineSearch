import { baseImgUrl } from '../data/api-ref.js';
class MainImg extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    set banner(bannerItem) {
        this._bannerItem = bannerItem;
        this.render();
        this.renderBanner();
    }

    set detail(detailItem) {
        this._detailItem = detailItem;
        this.render();
        this.renderDetail();
    }

    render() {
        this.shadowDOM.innerHTML = '';
        this.shadowDOM.innerHTML += `
            <style>
                :host {
                    width: 100%;
                    aspect-ratio: 4/1;
                    display: flex;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: rgba(255, 255, 255, 0.25);
                    box-shadow: rgba(255, 255, 255, 0.16) 0px 10px 36px 0px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px;
                }
            </style>
        `;
    }

    renderBanner() {
        this.shadowDOM.innerHTML += `
            <style>
                :host img {
                    width: 100%;
                    object-fit: cover;
                }
            </style>
            <img src="${baseImgUrl}/w1280${this._bannerItem.backdrop_path}"></img>
        `;
    }

    renderDetail() {
        const genre = this._detailItem.genres.map((genre) => genre.name).join(', ');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        this.shadowDOM.innerHTML += `
            <style>
                :host {
                    width: 100%;
                    height: calc(100vh - 128px);
                    overflow: hidden;
                    background-color: rgba(255, 255, 255, 0.25);
                }

                #poster {
                    width: max-content;
                    aspect-ratio: 2/3;
                    margin: 16px;
                    flex-basis: 1;
                }

                #poster img {
                    height: 100%;
                    border-radius: 8px;
                    background-color: white;
                    object-fit: cover;
                }

                #detail-info {
                    margin: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    flex-grow: 1;
                    overflow: auto;
                }

                .title {
                    font-size: 32px;
                    font-weight: bold;
                    margin: 0;
                }

                .overview {
                    font-size: 20px;
                    margin: 0;
                }

                #detail-list {
                    list-style: none;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    width: 100%;
                }

                #detail-list li {
                    width: 100%;
                    display: flex;
                    gap: 8px;
                }

                .detail-list-item {
                    display: inline-block;
                    padding: 8px;
                    width: 150px;
                    background-color: #e36414;
                    border-radius: 8px;
                    line-height: 100%;
                }

                .item-list-data {
                    display: inline-block;
                    padding: 8px;
                    border: #e36414 solid 1px;
                    width: 100%;
                    border-radius: 8px;
                    line-height: 100%;
                }

                @media screen and (max-width: 992px) {
                    .title {
                        font-size: 24px;
                    }

                    .overview {
                        font-size: 16px;
                    }

                    #detail-list li {
                        font-size: 12px;
                    }
                }

                @media screen and (max-width: 576px) {
                    :host {
                        flex-direction: column;
                        overflow: auto;
                        height: unset;
                    }

                    #poster {
                        width: calc(100% - 48px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        aspect-ratio: unset;
                        padding: 8px;
                    }

                    #poster img {
                        width: 100%;
                        max-width: 240px;
                        object-fit: fill;
                        height: unset;
                    }
                }
            </style>
            <div id="poster">
                <img src="${baseImgUrl}/w342${this._detailItem.poster_path}"></img>
            </div>
            <div id="detail-info">
                <h1 class="title">${(this._detailItem.number_of_episodes === undefined) ? this._detailItem.title : this._detailItem.name}</h1>
                <p class="overview">${this._detailItem.overview}</p>
                <ul id="detail-list">
                </ul>
            </div>
        `;

        const detailList = this.shadowDOM.querySelector('#detail-list');
        if (this._detailItem.number_of_episodes === undefined) {
            detailList.innerHTML = `
                <li><div class="detail-list-item">Language</div> <div class="item-list-data">${this._detailItem.spoken_languages[0].english_name}</div></li>
                <li><div class="detail-list-item">Genre</div> <div class="item-list-data">${genre}</div></li>
                <li><div class="detail-list-item">Rating</div> <div class="item-list-data">${this._detailItem.vote_average} / 10</li>
                <li><div class="detail-list-item">Budget</div> <div class="item-list-data"> USD ${this._detailItem.budget}</div></li>
                <li><div class="detail-list-item">Country</div> <div class="item-list-data">${this._detailItem.production_countries.map((country) => country.name).join(', ')}</div></li>
                <li><div class="detail-list-item">Release Date</div> <div class="item-list-data">${this._detailItem.release_date}</div></li>
            `;
        } else {
            detailList.innerHTML = `
                <li><div class="detail-list-item">Language</div> <div class="item-list-data">${this._detailItem.spoken_languages[0].english_name}</div></li>
                <li><div class="detail-list-item">Genre</div> <div class="item-list-data">${genre}</div></li>
                <li><div class="detail-list-item">Rating</div> <div class="item-list-data">${this._detailItem.vote_average} / 10</li>
                <li><div class="detail-list-item">Country</div> <div class="item-list-data">${this._detailItem.production_countries.map((country) => country.name).join(', ')}</div></li>
                <li><div class="detail-list-item">Release Date</div> <div class="item-list-data">${this._detailItem.first_air_date}</div></li>
                <li><div class="detail-list-item">Episodes</div> <div class="item-list-data">${this._detailItem.number_of_episodes}</div></li>
                <li><div class="detail-list-item">Seasons</div> <div class="item-list-data">${this._detailItem.number_of_seasons}</div></li>
            `;
        }

    }
}
customElements.define('main-img', MainImg);