const notFound =  (req,res,next)=>{
    const error = new Error('Route Not Found')
    next(error)
}


export default notFound
