module.exports = {
  CONSUMER_KEY: 'e7841fbd40559b732dc7c769669e6c3c03f9470010212e3eefc9bbd7',
  CONSUMER_KEY_SECRET: '394cd4ce7c4c3940824c76b77d73101b134158d61fff9e566f727f6be004',
  ACCESS_TOKEN_URL : 'https://oauth.withings.com/account/access_token',
  REQUEST_TOKEN_URL : 'https://oauth.withings.com/account/request_token',
  AUTHORIZATION_URL : 'https://oauth.withings.com/account/authorize',
  ACCOUNT_LOGIN_URL : 'https://account.withings.com/connectionuser/account_login?',
  AUTHORIZE_DELEGATION_URL: 'http://oauth.withings.com/account/authorize?acceptDelegation=true',
  CALLBACK_URL: 'http://localhost:'+ (process.env.PORT || '3000')+'/api/withings/redirect',
  HASH : 'HMAC-SHA1',
  VERSION: '1.0',
  SLEEP_MEASURE : 'https://wbsapi.withings.net/v2/sleep?action=get&',
  SLEEP_SUMMARY : 'https://wbsapi.withings.net/v2/sleep?action=getsummary&',
  USER_INFO :'https://wbsapi.withings.net/v2/user?action=getuserbyid&',
  ACTIVITY_MEASURE : 'https://wbsapi.withings.net/v2/measure?action=getactivity&'
};
