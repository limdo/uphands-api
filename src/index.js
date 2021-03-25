const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const db = require("./model");
const koaBody = require('koa-body');
const CryptoJS = require('crypto-js');

const bodyParser = () => {
  return koaBody({ multipart: true });
};  

const app = new Koa();
const router = new Router();
app.use(cors()); // CORS middleware, 프로젝트에 병합 시 제거

// !
const signupUser = async ctx => {
  const { user_name } = ctx.request.body;
  const ret = await db.signupUser({ user_name });

  ctx.body = ret;
};

router.post("/signup/user", bodyParser(), signupUser);

const showAnns = async ctx => {
  const ret = await db.showAnns();
  
  ctx.body = ret;
}
  
router.get("/ann/list", showAnns);

function codeGen () {
  let code = "";

  for (let i = 0; i < 6; i++) {
    let ran = Math.floor(Math.random() * 10);
    code += "" + ran;
  }

  return code;
}

const bid = async ctx => {
  const { ann_no, user_name, price } = ctx.request.body;
  
  let code = codeGen();
  console.log(price);

  let message = price + "" + code;
  
  let hashedprice = CryptoJS.MD5(message).toString(CryptoJS.enc.Hex);
  const ret = await db.bid({ ann_no, user_name, hashedprice });

  ctx.body = code;
}

router.post("/bid", bodyParser(), bid);

const validate = async ctx => {
  const { bid_ann_no, user_name, code } = ctx.request.body;

  const ret = await db.validate({ bid_ann_no, user_name, code });

  ctx.body = ret;
}

router.post("/validate", bodyParser(), validate);
//

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);