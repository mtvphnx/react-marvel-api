import {useState, useEffect} from "react";
import styles from "../Content/Content.module.scss";
import cn from "classnames";
import {Spinner, Error} from "../../components";
import useServer from "../../services/server";
import PropTypes from "prop-types";

export const CharList = (props) => {
    const [chars, setChars] = useState([]),
        [offset, setOffset] = useState(210),
        [endList, setEndList] = useState(false);

    const {loading, error, getAllCharacters, clearError} = useServer();

    const onCharsLoaded = (newChars) => {
        if (newChars.length < 9) {
            setEndList(true);
        }

        setChars(chars => [...chars, ...newChars]);
        setOffset(offset => offset + 9);
    }

    const updateList = () => {
        loadList();
    }

    const loadList = () => {
        clearError();

        getAllCharacters(offset)
            .then(onCharsLoaded);
    }

    useEffect(() => {
        updateList();
        // eslint-disable-next-line
    }, []);

    const {handler} = props;

    const elementsList = chars.map((item, index) => {
        return (
            <li key={item.id} className={styles.element}
                ref={e => props.setRef(e, index)}
                tabIndex={0}
                onClick={() => handler(item.id, index)}>
                <img src={item.thumbnail} alt={item.name}
                     style={{'objectPosition': item.fit ? `top ${item.fit}` : 'top center'}}/>
                <div className={styles.name}>{item.name}</div>
            </li>
        )
    });

    const loadingMessage = loading && chars.length === 0 ? <Spinner/> : null,
        errorMessage = error ? <Error/> : null;

    return (
        <ul className={styles.list}>
            {loadingMessage}
            {errorMessage}
            {elementsList}
            <div className={styles.load}>
                <button
                    onClick={loadList}
                    disabled={loading}
                    className={cn('button', styles.more)}
                    style={{'display': endList ? 'none' : 'block'}}>
                    {loading ? 'LOADING...' : 'LOAD MORE'}
                </button>
            </div>
        </ul>
    )
}

CharList.propTypes = {
    handler: PropTypes.func,
    setRef: PropTypes.func
}