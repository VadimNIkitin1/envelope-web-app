import { useRouteError } from 'react-router-dom';
import style from './ErrorPage.module.scss';

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div className={style.page} id="error-page">
      <h1>Oops!!! 😬</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={style.container}>
        <span className={style.text}>{error.status}</span>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
