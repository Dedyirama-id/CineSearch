import './list-item.js';
class RecMovies extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set movies(movies) {
        this._movies = movies;
        this.render();
    }

    set itemDetailElement(element) {
        this._itemDetailElement = element;
    }

    render() {
        this.shadowDOM.innerHTML = `
            <style>
                header {
                    margin-top: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: 16px;
                }

                header h1 {
                    width: fit-content;
                    font-size: 25px;
                    line-height: 100%;
                }

                header hr {
                    height: 1px;
                    background-color: white;
                    flex-grow: 1;
                    border-radius: 8px;
                }
                .item-container {
                    margin: 0 auto;
                    display: grid;
                    justify-items: center;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 16px;
                }
            </style>
            <header>
                <h1>Movies Recomendation</h1>
                <hr>
            </header>
            <div class="item-container">
            </div>
        `;
        this._movies.forEach((movie) => {
            const itemElement = document.createElement('list-item');
            const itemContainer = this.shadowDOM.querySelector('.item-container');
            itemElement.item = movie;
            itemElement.detailElement = this._itemDetailElement;
            itemElement.id = `movie/${movie.id}`;
            itemContainer.appendChild(itemElement);
        });
    }
}
customElements.define('rec-movies', RecMovies);