var OAuth = require('oauth');
var OAuth_cfg = require('./../../config/environment/OAuth_cfg');
var qs = require('querystring');
var User_withings = require('./model_users');
var Sleep_measure = require('./model_sleepMeasures');
var Sleep_summary = require('./model_sleepSummary');


function WithingsOAuth(){
  this.oauth = new OAuth.OAuth(
    OAuth_cfg.REQUEST_TOKEN_URL,
    OAuth_cfg.ACCESS_TOKEN_URL,
    OAuth_cfg.CONSUMER_KEY,
    OAuth_cfg.CONSUMER_KEY_SECRET,
    OAuth_cfg.VERSION,
    OAuth_cfg.CALLBACK_URL,
    OAuth_cfg.HASH
  );

  this.userid = '';
  this.accessToken = '';
  this.accessTokenSecret = '';
}

WithingsOAuth.prototype.getOAuth = function(){
  return this.oauth;
}

WithingsOAuth.prototype.authenticate = function(req, res){
  self = this;
  this.oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if (error) {
			console.log(error);
			res.send("yeah no. didn't work.")
		}
		else {
			   req.session.oauth = {};
			   req.session.oauth.token = oauth_token;
			   req.session.oauth.token_secret = oauth_token_secret;

         var urlAuth = self.oauth.signUrl(OAuth_cfg.AUTHORIZATION_URL, oauth_token, oauth_token_secret);

         res.redirect(urlAuth);
         //return res.status(200).json(urlAuth);
	   }
  });
}

WithingsOAuth.prototype.getAccessToken = function(req, res){
  self = this;
  req.session.userId = req.query.userid;
  self.userid = req.query.userid;
  this.oauth.getOAuthAccessToken(req.session.oauth.token, req.session.oauth.token_secret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]", 500);
    } else {
      req.session.oauth.accessToken = oauthAccessToken;
      req.session.oauth.accessTokenSecret = oauthAccessTokenSecret;

      User_withings.find(function(err, users){
        console.log(users);
        if (users.length > 0) {
          users.remove(function(err){
            if(err) console.log(err);
            //well removed
          });
        }
      });

      User_withings.findOrCreate({
        withingsId: self.userid,
        accessToken : oauthAccessToken,
        accessTokenSecret : oauthAccessTokenSecret
        }, function (err, user) {
          res.redirect('/api/withings/')
      });
    }
  });
}


WithingsOAuth.prototype.storeSleepMeasure = function(){
  var self = this;

  User_withings.find(function(err, users){
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var currentUser = users[0].withingsId

    var urlToSign = qs.stringify({
      userid: currentUser,
      startdate : today.getTime(),
      enddate : yesterday.getTime(),
    });

   var urlSleepMeasure = self.oauth.signUrl(OAuth_cfg.SLEEP_MEASURE + urlToSign, users[0].accessToken, users[0].accessTokenSecret);

   self.oauth.get(urlSleepMeasure,null, null, function (err, body, resu) {
     if (err) {
       if (err.data) {
         try {
           json = JSON.parse(err.data);
         } catch (_) {}
       }

       if (json && json.errors && json.errors.length) {
         var e = json.errors[0];
         return done(new Error(e.message, e.code));
       }
       return done(new Error('Failed to fetch user profile', err));
     }
       Sleep_measure.findOrCreate({
         withingsId: currentUser,
         backupDate: today.getTime(),
         dataMeasure: body
       }, function(err, sleep){
        if(err) console.log(err);
        //well saved
       });
   });
 });
}

WithingsOAuth.prototype.storeSleepSummary = function(){
  var self = this;

  User_withings.find(function(err, users){
    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var currentUser = users[0].withingsId

    var urlToSign = qs.stringify({
      userid: currentUser,
      startdate : today.getTime(),
      enddate : yesterday.getTime(),
    });

   var urlSleepMeasure = self.oauth.signUrl(OAuth_cfg.SLEEP_SUMMARY + urlToSign, users[0].accessToken, users[0].accessTokenSecret);

   self.oauth.get(urlSleepMeasure,null, null, function (err, body, resu) {
     if (err) {
       if (err.data) {
         try {
           json = JSON.parse(err.data);
         } catch (_) {}
       }

       if (json && json.errors && json.errors.length) {
         var e = json.errors[0];
         return done(new Error(e.message, e.code));
       }
       return done(new Error('Failed to fetch user profile', err));
     }
       Sleep_summary.findOrCreate({
         withingsId: currentUser,
         backupDate: today.getTime(),
         dataSummary: body
       }, function(err, sleep){
        if(err) console.log(err);
        //well saved
       });
   });
 });
}

module.exports = new WithingsOAuth();
