import css from './ErrorBackEnd.module.css';

const ErrorBackEnd = ({ errorBackEnd }) => {
  return (
    <div className={css.overlay}>
      <h1 className={css.titleError}>
        Ups! Error: <span className={css.titleErrorRed}>{errorBackEnd}</span>
      </h1>
    </div>
  );
};

export default ErrorBackEnd;
