import { useState, useCallback } from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

		setLoading(true); // Работаем с состояниями. Установили загрузку

		try { // пытаемся сделать запрос на сервер внутри
			const response = await fetch(url, {method, body, headers}); // Переменная с ответом

			if (!response.ok) { // Проверяем наш response 
				throw new Error(`Could not fetch ${url}, status ${response.status}`);
			}
	
			const data = await response.json(); // Получаем конкретно данные, присваиваем data
        
			setLoading(false); // Если данные загрузились, то загрузка устанавливается в false
			return data; // функция request вернет данные от сервера. Чистые данные от API
		} catch(e) {
			setLoading(false);
			setError(e.message); 
			throw e; // выкидываем ошибку
		}
	}, []);

	const clearError = useCallback(() => setError(null), []); // Чистим наши ошибки

	return {loading, request, error, clearError, };
};