const CONFIG_KEYS = {
    GOOGLE_AUTH_CLIENT_ID: import.meta.env.REACT_APP_CLIENT_ID as string,
    STRIPE_PUBLISHABLE_KEY: import.meta.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string,
    REDIRECT_URI: import.meta.env.REACT_APP_REDIRECT_URI as string,
    API_BASE_URL: import.meta.env.REACT_APP_API_BASE_URL as string,
};
export default CONFIG_KEYS;
