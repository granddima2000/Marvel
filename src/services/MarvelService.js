import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => { // Создаем класс, чтобы создавать экземпляры класса в других компонентах, чтобы использовать внутренние методы
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=730131ab4b7b1b5397bfa3c23124bd3f';
    const _baseOffset = 210;

    // Запросы к API
    const getAllCharacters = async (offset = _baseOffset) => { // Получить всех персонажей
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); // Создаем массив с новыми объектами
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
 
    const getCharacter = async (id) => { // Получение 1 персонажа
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]); // вызываем с результатом res
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?issueNumber=8&limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "There is no description",
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
        };
    }

    const _transformCharacter = (char) => { // Универсальный метод
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 220)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url, // urls
            wiki: char.urls[1].url,
            comics: char.comics.items,
            // comicId: comics[0].map(item => item.resourceURI.split('/').pop())



        }
    } // Трансформируем данные

    return {loading, error, clearError, getCharacterByName, getAllCharacters, getCharacter, getAllComics, getComic};
}

export default useMarvelService;