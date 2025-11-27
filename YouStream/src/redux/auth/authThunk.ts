import { setAuth } from "./authActions";
import { signOut as signOutAction } from "./authActions";
import { revokeToken } from "../../api/googleAuth";
import { AUTH_UPDATE_LOCAL_USER } from "./authTypes";

function saveCurrentAuth(user: any, token: string | null, provider: string | null) {
  try {
    const snapshot = { user, token, provider };
    localStorage.setItem("youstream_current_auth", JSON.stringify(snapshot));
  } catch { }
}

export const loginLocal = (email: string, password: string) => async (dispatch: any) => {
  const key = "youstream_local_user:" + email;

  const existing = localStorage.getItem(key);

  let user;

  if (existing) {
    user = JSON.parse(existing);
  } else {
    return "Invalid credentials"
  }


  try { localStorage.setItem("youstream_current_local_email", email); } catch { }

  saveCurrentAuth(user, null, "local");

  dispatch(setAuth({ user, token: null, provider: "local" }));
};



export const signupLocal = (email: string, password: string) => async (dispatch: any) => {
  const user = {
    email,
    name: email.split("@")[0],
    likes: {},
    subs: [],
    watchlater: [],
  };

  localStorage.setItem("youstream_local_user:" + email, JSON.stringify(user));
  try { localStorage.setItem("youstream_current_local_email", email); } catch { }
  saveCurrentAuth(user, null, "local");

  dispatch(setAuth({ user, token: null, provider: "local" }));
};

export const loginGoogle = (email: any, accessToken: string) => async (dispatch: any) => {
  const user = {
    email,
    name: email.split("@")[0],
    likes: {},
    subs: [],
    watchlater: [],
  };

  try {
    localStorage.setItem("youstream_google_token", accessToken);
    localStorage.setItem("youstream_google_user", JSON.stringify(user));
  } catch { }

  saveCurrentAuth(user, accessToken, "google");

  dispatch(setAuth({ user, token: accessToken, provider: "google" }));
};


export const signOutAll = () => async (dispatch: any, getState: any) => {
  const token = getState().auth?.token;
  if (token) {
    try { await revokeToken(token); } catch { }
  }
  localStorage.removeItem("youstream_google_token");
  localStorage.removeItem("youstream_google_user");
  localStorage.removeItem("youstream_current_auth");
  localStorage.removeItem("youstream_current_local_email");
  dispatch(signOutAction());
};


export const updateLocalUserLikes = (videoId: string, rating: 'like' | 'dislike' | 'none') => 
  async (dispatch: any, getState: any) => {
    const currentState = getState();
    const user = { ...currentState.auth.user };
    const provider = currentState.auth.provider;

    if (provider !== 'local' || !user || !user.email) {
        return; 
    }

    if (rating === 'none') {
        delete user.likes[videoId];
    } else {
        user.likes[videoId] = rating;
    }
    
    const key = "youstream_local_user:" + user.email;
    localStorage.setItem(key, JSON.stringify(user));
    
    saveCurrentAuth(user, null, "local");
    dispatch({
        type: AUTH_UPDATE_LOCAL_USER,
        payload: user,
    });
};