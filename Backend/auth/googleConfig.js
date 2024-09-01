import {google} from "googleapis";

const GOOGLE_CLIENT_ID = "1084852529883-rid09673rjsvcq40gbrl472rsbjs7s0p.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage'
); 

export default oauth2client