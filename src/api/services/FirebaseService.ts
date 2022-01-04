import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const provider = (): firebase.auth.GoogleAuthProvider => {
  const prov = new firebase.auth.GoogleAuthProvider();
  prov.addScope('profile');
  prov.addScope('email');
  return prov;
};

class FirebaseService {
  instance: firebase.app.App;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    };

    this.instance = firebase.initializeApp(firebaseConfig);
  }

  loginWithGoogle() {
    return this.instance.auth().signInWithRedirect(provider());
  }

  logout() {
    return this.instance.auth().signOut();
  }

  getToken = async () => {
    const user = await this.onAuthStateChanged();
    return user.getIdToken();
  };

  onAuthStateChanged() {
    return new Promise<firebase.User>((resolve, reject) => {
      this.instance.auth().onAuthStateChanged(async (user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not logged in'));
        }
      });
    });
  }

  getRedirectResult() {
    this.instance.auth().getRedirectResult();
  }
}

export default new FirebaseService();
