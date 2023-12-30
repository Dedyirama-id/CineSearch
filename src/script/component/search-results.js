import './list-item.js';
class SearchResult extends HTMLElement {
    constructor() {
        super();
        this.shadowDOM = this.attachShadow({ mode: 'open' });
    }

    set results(results) {
        this._results = results;
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
                <h1>Hasil Pencarian</h1>
                <hr>
            </header>
            <div class="item-container">
            </div>
        `;
        this._results.forEach((result) => {
            const itemElement = document.createElement('list-item');
            const itemContainer = this.shadowDOM.querySelector('.item-container');
            if (result.media_type == 'movie') {
                itemElement.type = 'movie';
            } else if (result.media_type == 'tv') {
                itemElement.type = 'tv';
            }

            itemElement.item = result;
            itemElement.detailElement = this._itemDetailElement;

            if (result.media_type == 'movie') {
                itemElement.id = `movie/${result.id}`;
            } else if (result.media_type == 'tv') {
                itemElement.id = `tv/${result.id}`;
            }
            itemContainer.appendChild(itemElement);
        });
    }

    renderError(message) {
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
                    width: 100%;
                }

                .item-container i {
                    color: white;
                }
            </style>
            <header>
                <h1>Hasil Pencarian</h1>
                <hr>
            </header>
            <div class="item-container">
                <i>${message}</i>
            </div>
        `;
    }
}
customElements.define('search-results', SearchResult);