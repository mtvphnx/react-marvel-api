import {Component} from "react";
import styles from './Info.module.scss';
import Server from "../../services/server";
import cn from "classnames";
import {Spinner} from "../Spinner/Spinner";
import {Error} from "../Error/Error";
import {Skeleton} from "../Skeleton/Skeleton";

export default class Info extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }
    API = new Server();

    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }

    onErrorLoader = () => {
        this.setState({loading: false, error: true});
    }

    updateChar = () => {
        const {id} = this.props;
        if (!id) return;

        this.setState({loading: true, error: false});

        this.API
            .getElement(id)
            .then(result => this.onCharLoaded(result))
            .catch(this.onErrorLoader);
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.id !== this.props.id) {
            this.updateChar();
        }
    }

    render() {
        const {char, loading, error} = this.state;

        return (
            <div className={styles.wrapper}>
                {char || loading || error ? null : <Skeleton/>}
                {loading ? <Spinner/> : null}
                {error ? <Error/> : null}
                {!loading && !error && char ? <View char={char}/> : null}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    const comicsList = comics.map((item, index) => {
        if (index < 10) {
            return (
                <li key={index} className={styles.item}>
                    <a href={item.resourceURI} target="_blank" rel="noreferrer">{item.name}</a>
                </li>
            )
        }
    });

    return (
        <>
            <div className={styles.top}>
                <div className={styles.pic}>
                    <img src={thumbnail} alt={name}/>
                </div>
                <div className={styles.wrap}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.func}>
                        <a href={homepage} target="_blank" rel="noreferrer" className={cn('button', styles.button)}>Homepage</a>
                        <a href={wiki} target="_blank" rel="noreferrer" className={cn('button', styles.button)}>Wiki</a>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.description}>{description ? description : 'Description not found'}</div>
                {comics.length > 0 ? <div className={styles.subtitle}>Comics:</div> : null}
                <ul className={styles.list}>
                    {comics.length > 0 ? comicsList : null}
                </ul>
            </div>
        </>
    )
}