var config = {};

config.mongoURI = {
  development: "mongodb://localhost/node-testing",
  test: "mongodb://localhost/node-test",
  production: "mongodb://heroku_wp860jdn:f5jhkobaramp61u7om4ggjk14l@ds051883.mongolab.com:51883/heroku_wp860jdn"
};

module.exports = config;
