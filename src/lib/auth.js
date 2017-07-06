import phantom from 'phantom';
import credentials from './fb_login_credentials';

const FB_AUTH_TOKEN_URL =
  'https://m.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&state=%7B%22challenge%22%3A%22q1WMwhvSfbWHvd8xz5PT6lk6eoA%253D%22%2C%220_auth_logger_id%22%3A%2254783C22-558A-4E54-A1EE-BB9E357CC11F%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=54783C22-558A-4E54-A1EE-BB9E357CC11F#_=_';

const USER_AGENT =
  'Mozilla/5.0 (Linux; U; en-gb; KFTHWI Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.16 Safari/535.19';

async function getAuthenticationToken() {
  try {
    //create phantom instance
    const instance = await phantom.create();
    //create a web page instance
    const page = await instance.createPage();

    //defines settings to apply to page instance
    const settings = {
      loadImages: false,
      userAgent: USER_AGENT,
    };
    //applies settings to page instance
    Object.keys(settings).reduce((_, key) => {
      page.setting(key, settings[key]);
    }, null);

    //configures phantom to intercept console logs in browser and output it to terminal
    await page.on('onConsoleMessage', msg => {
      console.log(msg);
    });

    //opens facebook auth page for tinder
    const status = await page.open(FB_AUTH_TOKEN_URL);

    //checks if page was successfully opened
    if (status === 'success') {
      //sets the values of the email and password fields with their respective values and submits the form
      await page.evaluate(function(credentials) {
        document.querySelector("input[name='email']").value =
          credentials.FB_EMAIL;
        document.querySelector("input[name='pass']").value =
          credentials.FB_PASSWORD;
        document.querySelector("button[name='login']").click();
      }, credentials);

      setTimeout(async () => await page.evaluate(function() {
        document.querySelector("button[name='__CONFIRM__']").click();
      }), 2000);


      page.on('onUrlChanged', async targetUrl => {
        const urlRegex = /.*\/confirm$/;
        if (urlRegex.test(targetUrl)) {
          let accessToken = await page.evaluate(function() {
            const accessTokenRegex = /access_token=(.+)&/;
            return document
              .querySelector('script')
              .innerHTML.match(accessTokenRegex)[1];
          });
          await instance.exit();
          console.log(accessToken);
        }
      });
    } else {
      console.error('Unable to open URL');
    }
  } catch (e) {
    console.error(e);
  }
}

getAuthenticationToken().then(() => {});
