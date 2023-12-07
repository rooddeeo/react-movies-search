import css from './ErrorBackEnd.module.css';

const ErrorBackEnd = ({ errorBackEnd }) => {
  return (
    <h1 className={css.titleError}>
      Ups! <span className={css.titleErrorRed}>Error:</span> {errorBackEnd}
    </h1>
  );
};

export default ErrorBackEnd;
