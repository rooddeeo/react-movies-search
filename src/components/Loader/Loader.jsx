import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.overlay}>
      <div className={css.loader}>
        <Oval
          height={40}
          width={40}
          color="#ffffff"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="silver"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
      </div>
    </div>
  );
};

export default Loader;
