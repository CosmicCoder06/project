const getPostsList = (req, res) => {
  res.send("ye le saare blogs hai is list m");
}

const addNewPost = (req, res) => {
  res.send("ja kr diya post");
};

const sendPostById = (req, res) => {
    res.send("ye lo jo blog maanga wo wala");
};

const updatePost = (req, res) => {
    res.send(`update kr diya ${req.params.id}`);
};

const patchPost = (req, res) => {
    res.send(`patch kr diya ${req.params.id}`);
}; 

const deletePost = (req, res) => {
    res.send(`delete kr diya ${req.params.id}`);
};

const putPost = (req, res) => {
    res.send(`put kr diya ${req.params.id}`);
};

module.exports = {
    getPostsList,
    addNewPost,
    sendPostById,
    updatePost,
    patchPost,
    deletePost,
    putPost
};