export const createError = (status, message) => {
    const failed = true;
    const err = new Error();
    err.status = status; 
    err.message = message; 
    return err;
}