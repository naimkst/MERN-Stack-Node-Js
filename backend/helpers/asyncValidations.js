module.exports = (asyncValidation) => (req, res, next) => {
    Promise.resolve(asyncValidation(req, res, next)).catch(next);
}