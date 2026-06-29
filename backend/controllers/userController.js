exports.profile = (req, res) => {

    res.json({
        message: "Profile data",
        user: req.user
    });
};

exports.getMe = (req, res) => {

    res.json({
        user: req.user
    });
}