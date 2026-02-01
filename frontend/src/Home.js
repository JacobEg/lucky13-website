import IssueList from "./GameList";
import { getIssues } from './fetchIssueData';
import { useState }  from "react";

/**
 * Home page available at /
 */
const Home = () => {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [issues, setIssues] = useState(null);
    const [repoOwner, setRepoOwner] = useState('');
    const [repoName, setRepoName] = useState('');
    const [personalAccessToken, setPersonalAccessToken] = useState('');
    //const [issueState, setIssueState] = useState('open');
    
    /**
     * Handles the submission of form to get the list of issues
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setIsPending(true);
        const getIssuesData = await getIssues(repoOwner, repoName, personalAccessToken);
        setIsPending(false);
        setError(getIssuesData.error);
        setIssues(getIssuesData.issues);
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
                <button>See issues</button>
            </form>
        
            { error && <div>{ error }</div> }
            { issues && <IssueList issues={issues} personalAccessToken={personalAccessToken} repoOwner={repoOwner} repoName={repoName}/> }
            { isPending && <div>Loading...</div> }
            { (!issues && !error && !isPending) && <div>Please enter the information for the repo you'd like to see</div> }
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