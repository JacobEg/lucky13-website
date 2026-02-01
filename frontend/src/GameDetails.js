import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
 
/**
 * Gets a more detailed report of the game and its comments (if any).
 * Available at /games/:owner/:name/:id
 */
const GameDetails = () => {
    const { name } = useParams();
    const history = useHistory();
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState('');
    const [ game, setgame ] = useState(null);
    const location = useLocation();
    const state = location.state;
    let personalAccessToken = '';
    if(state && state.personalAccessToken){
        personalAccessToken = state.personalAccessToken;
    }
    /*console.log('personalAccessToken =', personalAccessToken);
    console.log('id =', id);
    console.log('name =', name);
    console.log('owner =', owner);*/

    /**
     * Get game details and comments upon load
     */
    useEffect(() =>{
        setIsPending(true);
        setIsPending(false);
    }, []);

    return (
        <div>
            <button onClick={() => {history.go(-1)}}>Back to Home</button>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { game && 
                <div>
                    <section>
                        <article className="game-details">
                            <h2>{game.title}</h2>
                            <p>{game.desc}</p>
                        </article>
                    </section>
                </div>
            }
        </div>
    );
};
/**
 * <button onClick={history.go(-1)}>Back to Home</button>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { game && 
                <div>
                    <section>
                        <article>
                            <h2>{game.title}</h2>
                            <h5>Opened by: {game.user.login}</h5>
                            <h5>Assigned to: {game.assignee.login}</h5>
                            <h6>Last updated: {game.updated_at}</h6>
                            <div>{game.labels.map(label => (
                                <div style={`color:#${label.color};`}>{label.name}</div>
                            ))}</div>
                            <p>{game.body}</p>
                        </article>
                    </section>
                </div>
            }
 */

export default GameDetails;