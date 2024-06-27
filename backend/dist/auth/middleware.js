function userAuthentication(req, res, next) {
    const authheader = req.headers.authorization;
    if (authheader) {
        let token = authheader.split(' ')[1];
        jwt.verify(token, SEcREAT, (err, decoded) => {
            if (err) {
                res.status(403).send({ "msg": "unauthorized lodu" });
            }
            req.somedata = "hello";
            req.user = decoded;
            next();
        });
    }
    // else{
    //     res.write("msg:no auth header")
    //     res.end()
    // }
}
module.exports = userAuthentication;
