module.exports = (handle) => (req,res,next)=>{
    Promise.resolve(handle(req,res,next)).catch(next);
}