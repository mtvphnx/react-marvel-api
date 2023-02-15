import {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import styles from './ComicsList.module.scss';
import cn from "classnames";
import {Spinner, Error, ErrorBoundary} from "../../components";
import useServer from "../../services/server";

export const ComicsList = () => {
  const [comics, setComics] = useState([]),
      [listLoading, setListLoading] = useState(false),
      [offset, setOffset] = useState(0),
      [endList, setEndList] = useState(false);

  const {loading, error, getAllComics, clearError} = useServer();

  const onComicsLoaded = (newComics) => {
    if (newComics.length < 8) {
      setEndList(true);
    }

    setComics(comics => [...comics, ...newComics]);
    setOffset(offset => offset + 8);
    setListLoading(false);
  }

  const updateList = () => {
    loadList(true);
  }

  const loadList = (initial) => {
    clearError();
    initial ? setListLoading(false): setListLoading(true);

    getAllComics(offset)
        .then(onComicsLoaded);
  }

  useEffect(() => {
    updateList();
    // eslint-disable-next-line
  }, []);

  const elementsList = comics.map((item, index) => {
    return (
        <Link to={`${process.env.PUBLIC_URL}/comics/${item.id}`} key={index} className={styles.element} tabIndex={0}>
          <img src={item.thumbnail} alt={item.title}/>
            <div className={styles.name}>{item.title}</div>
            <div className={styles.price}>{item.price}</div>
        </Link>
    )
  })

  const loadingMessage = loading && !listLoading ? <Spinner/> : null,
      errorMessage = error ? <Error/> : null;


  return (
      <ul className={styles.list}>
        {loadingMessage}
        {errorMessage}
        <div className={styles.wrapper}>
          <ErrorBoundary>
              {elementsList}
          </ErrorBoundary>
        </div>
        <div className={styles.load}>
          <button
              onClick={loadList}
              disabled={loading}
              className={cn('button', styles.more)}
              style={{'display': endList ? 'none' : 'block'}}>
            {loading ? 'loading...' : 'LOAD MORE'}
          </button>
        </div>
      </ul>
  )
}