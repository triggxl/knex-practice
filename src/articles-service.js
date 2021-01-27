// 1. make object to export
const ArticlesService = {
  //2. methods to store transactions
  getAllArticles() {
    return Promise.resolve('all the articles!!')
  }
};

module.exports = ArticlesService;