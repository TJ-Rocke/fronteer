// import mixpanel class from the library - env edit
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

// create an instance Mixpanel object using your project token
export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === "development",
    autocapture: {
      pageview: "full-url", // Captures pageviews
      click: true, // Captures clicks
      submit: true, // Captures form submissions
      input: false, // Disables input tracking
      scroll: false, // Disables scroll tracking
    },
  });
};
