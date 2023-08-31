export const getUserLocalStorage = () => {
    return JSON.parse(localStorage.getItem('authUser') ?? 'null');
}