import axios from 'axios';

const token =
  'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJVNGdNaUZWMXFMYm1XMWUyRGtfcFFlT1BWaWFhaFdFdUZWZC1NbTMzM2ZJIn0.eyJleHAiOjE3MTQwNjEwODgsImlhdCI6MTcxNDAyNTE3OCwiYXV0aF90aW1lIjoxNzE0MDI1MDg4LCJqdGkiOiI1MDcwY2I1OS04ZmIxLTRhYzEtYTg4Yy04ODIwNzZmYTQ1MGIiLCJpc3MiOiJodHRwOi8vZGplbXNvbHV0aW9ucy5jb206MTIwMTYvYXV0aC9yZWFsbXMvRGplbXMiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGZiMmY1YjQtYzg4Mi00ZDZlLTkxNzItM2U0MjhiODExZWY4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGplbS1mcm9udGVuZCIsIm5vbmNlIjoiODQ5ZmQzZDYtZGEyNy00MGRkLTgxMzQtYzljNjVkNGE5NDkzIiwic2Vzc2lvbl9zdGF0ZSI6ImYzMzhmMGQzLTEyYzYtNDRjNy1iODBiLTc1MzZlNGZlOWE1YSIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL3d3dy5kamVtc29sdXRpb25zLmNvbToxMjAyOCIsImh0dHA6Ly9kamVtc29sdXRpb25zLmNvbToxMjAxMiIsImh0dHA6Ly9kamVtc29sdXRpb25zLmNvbToxMjAyMSIsImh0dHA6Ly9sb2NhbGhvc3QiLCJodHRwOi8vd3d3LmRqZW1zb2x1dGlvbnMuY29tOjEyMDIxIiwiaHR0cDovL2xvY2FsaG9zdDo0MjAwIiwiaHR0cDovL3d3dy5kamVtc29sdXRpb25zLmNvbToxMjAxMiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzIyMjIiLCJodHRwOi8vZGplbXNvbHV0aW9ucy5jb206MTIwMjgiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWRqZW0iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZjMzOGYwZDMtMTJjNi00NGM3LWI4MGItNzUzNmU0ZmU5YTVhIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiIsImVtYWlsIjoidTFAZ21haWwuY29tIn0.bqXihpjf0PUujq3oqvSUozNKJ-57QSG2U5R81kmIB4V6UEzF2WkEXMvFhPNylMTPkT7NUNrgbG1rDAQ3Iw0d390KtU9PkgpviKk208rwOK0ysjjoV54XoTMw2gEQn689OmPy7eJ2AkblBTmtf2MJhSzKIbXQw467OBrboIswWyw4RphFldZhGL6WG8P49_Rif32k_21dD0SKpfsYeQqY3HGgJQuTJ8ag_tc30A4cfzgA3e7QW6YL9HG_yv8FJaWIHlgVNNOibqOqbZrb5rKh_vvqEcZak_zF5--Ohin2BltZ8DdPGebUf6urUup7aoeVAeyT4ioUUGZ-kkhqr5ATbw';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:3000/',
  // baseURL: 'http://www.djemsolutions.com:12010',
  headers: {
    Authorization: `${token}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // Если запрос выполнен успешно, просто передаем ответ дальше

    return response;
  },
  (error) => {
    // Если произошла ошибка, проверяем её код
    if (error.response && error.response.status === 401) {
      // Обработка ошибки 401 (неавторизованный запрос)
      console.error('Ошибка 401: Неавторизованный запрос');
      // Вы можете сделать что-то специфичное для этой ошибки, например, перенаправить пользователя на страницу входа
      // window.location.href = '/login';
    }
    // Если ошибка не 401, просто передаем её дальше
    return Promise.reject(error);
  }
);
