export const environment = {
  production: true,
  firebase: {
    apiKey: '${{ secrets.FIREBASE_apiKey }}',
    authDomain: '${{ secrets.FIREBASE_authDomain }}',
    projectId: '${{ secrets.FIREBASE_projectId }}',
    storageBucket: '${{ secrets.FIREBASE_storageBucket }}',
    messagingSenderId: '${{ secrets.FIREBASE_messagingSenderId }}',
    appId: '${{ secrets.FIREBASE_appId }}',
    measurementId: '${{ secrets.FIREBASE_measurementId }}',
    databaseURL: '${{ secrets.FIREBASE_databaseURL }}',
  },
};
