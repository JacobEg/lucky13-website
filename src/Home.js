import GameList from "./GameList";
import { getGames } from './fetchGameData';
import { useState }  from "react";

/**
 * Home page available at /
 */
const Home = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [games, setGames] = useState(null);
    const [repoOwner, setRepoOwner] = useState('');
    const [repoName, setRepoName] = useState('');
    const [personalAccessToken, setPersonalAccessToken] = useState('');
    //const [gameState, setGameState] = useState('open');
    
    /**
     * Handles the submission of form to get the list of games
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setIsPending(true);
        const getGamesData = await getGames(repoOwner, repoName, personalAccessToken);
        setIsPending(false);
        setError(getGamesData.error);
        setGames(getGamesData.games);
    };

    return (
        <div className="home">
            <form onSubmit={handleSubmit} className="form-inline">
                <label style={{'display': 'block'}}>Repo's owner:</label>
                <input
                    type="text"
                    required
                    value={repoOwner}
                    onChange={(e) => setRepoOwner(e.target.value)}
                />
                <br></br>
                <label style={{'display': 'block'}}>Repo's name:</label>
                <input
                    type="text"
                    required
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)} 
                />
                <br></br>
                <button>See games</button>
            </form>
        
            { error && <div>{ error }</div> }
            { games && <GameList games={games} personalAccessToken={personalAccessToken} repoOwner={repoOwner} repoName={repoName}/> }
            { isPending && <div>Loading...</div> }
            { (!games && !error && !isPending) && <div>Please enter the information for the repo you'd like to see</div> }
        </div>
    );
}

/*<label>Personal Acces Token (only needed for private repos)</label>
                <input
                    type="text"
                    value={personalAccessToken}
                    onChange={(e) => setPersonalAccessToken(e.target.value)}
                />*/
export default Home;