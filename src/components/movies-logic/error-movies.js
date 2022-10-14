import { Alert } from 'antd';
import React from 'react';

const onClose = (e) => {
  console.log(e, 'I was closed.');
};
function ErrorMovies() {
  return (
    <>
      <Alert
        message="Извините произошла какая то ошибка, мы уже сообщили разработчикам"
        type="warning"
        closable
        onClose={onClose}
      />
      <Alert
        message="Серверная ошибка"
        description="Узнал причину ошибки,ошибка не наша а сервера, оставьте жалобу в TMDB"
        type="error"
        closable
        onClose={onClose}
      />
    </>
  );
}
export default ErrorMovies;
