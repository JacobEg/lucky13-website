import { Link } from 'react-router-dom';

/**
 * Lists preview of each game, including its name, and a brief description. Each game links to GameDetails.
 * @param {object} props contains the games, personalAccessToken.
 */
const GameList = (props) => {
    let games = props.games;
    let personalAccessToken = props.personalAccessToken;
    const personalAccessTokenData = {
        'personalAccessToken': `${personalAccessToken}`
    };
    return (
        <div className="game-list">
            <section>
                {games.map(game => (
                    <article className="game-preview" key={game.title}>
                        <div>
                            <Link to={`/games/${game.title}`} state={personalAccessTokenData}>
                                <h2>{ game.title }</h2>
                                <p>Opened by { game.desc }</p>
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default GameList;