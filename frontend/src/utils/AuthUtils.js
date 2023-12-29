export const checkIfUserIsAuthenticatedFromLocalStorage = () => {
    const authToken = localStorage.getItem('authToken');
    return !!authToken;
}