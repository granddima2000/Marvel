
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=730131ab4b7b1b5397bfa3c23124bd3f'; 
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }
    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        console.log(res);
        return res.data.results.map(this._transformCharacter); // Создаем массив с новыми объектами
    }

    getCharacter = async (id) => { // Получение 1 персонажа
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        console.log(res);
        return this._transformCharacter(res.data.results[0]); // вызываем с результатом res
    }

    _transformCharacter = (char) => { // Универсальный метод
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 220)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url, // urls
            wiki: char.urls[1].url
        }
    } // Трансформируем данные
}

export default MarvelService;