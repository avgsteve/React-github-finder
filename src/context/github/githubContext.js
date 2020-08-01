import { createContext } from 'react';//

const githubContext = createContext();

/*
In Search.js 

import GithubContext from '../../context/github/githubContext';

// initialize githubcontext
const githubContext = useContext(GithubContext);

// in const onSubmit = e => {
githubContext.searchUsers(text);


*/

export default githubContext;//

