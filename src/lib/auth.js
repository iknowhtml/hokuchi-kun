import phantom from 'phantom';
// import { FB_EMAIL, FB_PASSWORD } from './fb_login_credentials';
//
// const MOBILE_USER_AGENT = "Mozilla/5.0 (Linux; U; en-gb; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.16 Safari/535.19";

const FB_AUTH_TOKEN_URL = 'https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&state=%7B%22challenge%22%3A%22q1WMwhvSfbWHvd8xz5PT6lk6eoA%253D%22%2C%220_auth_logger_id%22%3A%2254783C22-558A-4E54-A1EE-BB9E357CC11F%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=54783C22-558A-4E54-A1EE-BB9E357CC11F#_=_';

async function getAuthenticationToken() {
  try {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', (requestData) => {
      console.info(requestData.url);
    });
    const status = await page.open(FB_AUTH_TOKEN_URL);
    console.log(status);
    await instance.exit();
  } catch (error) {
    console.log(error);
  }
}

getAuthenticationToken();
