const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'Hello world';
    await this.ctx.render('index');
  }
}

module.exports = HomeController;