export const setAuthToken = (token) => {
    console.log("Setting auth token:", token);
    if (token) {
        localStorage.setItem('authToken', token);
        console.log("Token set in localStorage:", localStorage.getItem('authToken'));
    } else {
        localStorage.removeItem('authToken');
        console.log("Token removed from localStorage");
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

export const isAuthenticated = () => {
    return !!getAuthToken();
};