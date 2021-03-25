const db = require("../database");
const CryptoJS = require('crypto-js');

const self = {};

// register as an user
self.signupUser = async ({ user_name }) => {
  const query = `
    INSERT INTO \`user\`(user_name)
    values (?);
  `;
  await db.raw(query, [ user_name ]);
};

// showing boards about anns
self.showAnns = async () => {
  const query = `
    SELECT * FROM announce a
    INNER JOIN \`user\` u ON u.user_no = a.ann_user
    ORDER BY a.ann_date DESC
  `;

  const ret = await db.raw(query);
  return ret[0];
}

// bidding
self.bid = async ({ ann_no, user_name, hashedprice }) => {
  const query = `
    INSERT INTO bidding 
    VALUES (NULL, ?, (SELECT user_no FROM \`user\` WHERE user_name = ?), 
    ?, NOW())
  `;

  await db.raw(query, [ ann_no, user_name, hashedprice ]);
}

// validate
self.validate = async ({ bid_ann_no, user_name, code }) => {
  const query = `
    SELECT bid_hashedprice FROM bidding b 
    INNER JOIN \`user\` u ON u.user_no = b.bid_user
    WHERE b.bid_ann_no = ? AND u.user_name = ?
  `;

  const ret = await db.raw(query, [ bid_ann_no, user_name ]);
 
  let hashedCode = CryptoJS.MD5(code).toString(CryptoJS.enc.Hex);

  console.log(code);
  console.log(ret[0][0].bid_hashedprice);
  console.log(hashedCode);
  let result = (hashedCode == ret[0][0].bid_hashedprice) ? true: false; 

  return result;
}

module.exports = self;


// db rawdata parsing