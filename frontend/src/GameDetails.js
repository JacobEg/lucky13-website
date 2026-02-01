import { getIssueDetails, getIssueComments } from './fetchIssueData';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
 
/**
 * Gets a more detailed report of the issue and its comments (if any).
 * Available at /issues/:owner/:name/:id
 */
const IssueDetails = () => {
    const { id, name, owner } = useParams();
    const history = useHistory();
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState('');
    const [ issue, setIssue ] = useState(null);
    const [ comments, setComments ] = useState(null);
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
     * Get issue details and comments upon load
     */
    useEffect(() =>{
        setIsPending(true);
        getIssueDetails(owner, name, id, personalAccessToken)
            .then(data => {
                setIssue(data.issue);
                setError(data.error);
            });
        getIssueComments(owner, name, id, personalAccessToken)
            .then(data => {
                if(!error){
                    setError(data.error);
                }
                setComments(data.comments);
            });
        setIsPending(false);
    }, []);

    return (
        <div>
            <button onClick={() => {history.go(-1)}}>Back to Home</button>
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { issue && 
                <div>
                    <section>
                        <article className="issue-details">
                            <h2>{issue.title}</h2>
                            <h4>Opened by: {issue.user.login}</h4>
                            {issue.assignee && <h5>Assigned to: {issue.assignee.login}</h5>}
                            <h6>Last updated: {issue.updated_at}</h6>
                            <div>{issue.labels.map(label => (
                                <div style={`color:#${label.color};`}>{label.name}</div>
                            ))}</div>
                            <p>{issue.body}</p>
                        </article>
                        {comments && comments.map(comment => (
                            <article className='comment' key={comment.id}>
                                <h4>At {comment.updated_at}, {comment.user.login} commented:</h4>
                                <p>{comment.body}</p>
                            </article>
                        ))}
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
            { issue && 
                <div>
                    <section>
                        <article>
                            <h2>{issue.title}</h2>
                            <h5>Opened by: {issue.user.login}</h5>
                            <h5>Assigned to: {issue.assignee.login}</h5>
                            <h6>Last updated: {issue.updated_at}</h6>
                            <div>{issue.labels.map(label => (
                                <div style={`color:#${label.color};`}>{label.name}</div>
                            ))}</div>
                            <p>{issue.body}</p>
                        </article>
                    </section>
                </div>
            }
 */

export default IssueDetails;