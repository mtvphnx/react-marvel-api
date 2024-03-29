import styles from "../Hero/Hero.module.scss";
import cn from "classnames";
import PropTypes from "prop-types";

export const RandomChar = (props) => {
    const {name, description, thumbnail, homepage, wiki, fit} = props.char;

    return (
        <div className={styles.hero}>
            <div className={styles.thumbnail}>
                <img src={thumbnail} alt={name}
                     style={{'objectPosition': fit ? `top ${fit}` : 'top center'}}/>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.func}>
                    <a href={homepage} className={cn('button', styles.link)} target="_blank" rel="noreferrer">Homepage</a>
                    <a href={wiki} className={cn('button', styles.link)} target="_blank" rel="noreferrer">Wiki</a>
                </div>
            </div>
        </div>
    )
}

RandomChar.propTypes = {
    char: PropTypes.object
}