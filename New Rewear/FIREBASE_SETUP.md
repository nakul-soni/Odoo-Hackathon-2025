# Firebase Authentication Setup Guide

This guide will help you set up Firebase Authentication for the ReWear application.

## Prerequisites

1. A Google account
2. Basic knowledge of web development

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "ReWear App")
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:

### Email/Password Authentication
1. Click on "Email/Password"
2. Toggle the "Enable" switch to ON
3. Optionally enable "Email link (passwordless sign-in)"
4. Click "Save"

### Google Authentication
1. Click on "Google"
2. Toggle the "Enable" switch to ON
3. Add a project support email
4. Click "Save"

## Step 3: Get Your Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "ReWear Web App")
6. Copy the configuration object

## Step 4: Update Firebase Configuration

1. Open the `firebase-config.js` file in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCUmbNegiLN0hmAkNzPOvdT_RL8h94fmw",
  authDomain: "rewear-clothing.firebaseapp.com",
  databaseURL: "https://rewear-clothing-default-rtdb.firebaseio.com",
  projectId: "rewear-clothing",
  storageBucket: "rewear-clothing.firebasestorage.app",
  messagingSenderId: "756102423",
  appId: "1:756102423:web:0e4f50d798d5342b59f352",
  measurementId: "G-YE99CW4ZSR"
};
```

## Step 5: Configure Authorized Domains

1. In Firebase Console, go to Authentication > Settings
2. Scroll down to "Authorized domains"
3. Add your domain (for local development, add `localhost`)

## Step 6: Test the Implementation

1. Open `login.html` in your browser
2. Try creating an account with email/password
3. Try signing in with Google
4. Check the browser console for any errors

## Features Implemented

### Email/Password Authentication
- ✅ User registration with email and password
- ✅ User login with email and password
- ✅ Password validation (minimum 6 characters)
- ✅ Password confirmation validation
- ✅ Error handling for common authentication issues
- ✅ Automatic sign-in after registration

### Google Sign-In
- ✅ Google OAuth authentication
- ✅ Popup-based sign-in flow
- ✅ Error handling for popup blockers
- ✅ Automatic account creation for new users

### User Experience
- ✅ Loading states during authentication
- ✅ Success modals after successful authentication
- ✅ Error messages for failed authentication attempts
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Responsive design

### Integration
- ✅ Integration with existing auth system
- ✅ User data synchronization
- ✅ Automatic redirect to dashboard after login
- ✅ Session persistence

## Security Considerations

1. **API Key Security**: The Firebase API key is safe to expose in client-side code as it's restricted by Firebase Security Rules
2. **Password Requirements**: Firebase enforces minimum password requirements
3. **Rate Limiting**: Firebase automatically implements rate limiting for authentication attempts
4. **HTTPS**: Always use HTTPS in production for secure authentication

## Troubleshooting

### Common Issues

1. **"Firebase is not defined"**
   - Make sure Firebase SDK scripts are loaded before your custom scripts
   - Check that the Firebase SDK URLs are accessible

2. **"auth/unauthorized-domain"**
   - Add your domain to the authorized domains list in Firebase Console
   - For local development, add `localhost`

3. **"auth/popup-blocked"**
   - Ensure popups are allowed in the browser
   - Check if any ad blockers are interfering

4. **"auth/network-request-failed"**
   - Check your internet connection
   - Verify Firebase project is active

### Debug Mode

To enable debug logging, add this before initializing Firebase:

```javascript
firebase.auth().useDeviceLanguage();
firebase.auth().settings.appVerificationDisabledForTesting = true; // Only for testing
```

## Next Steps

1. **Email Verification**: Implement email verification for new accounts
2. **Password Reset**: Add password reset functionality
3. **Profile Management**: Allow users to update their profile information
4. **Social Login**: Add more social login providers (Facebook, Twitter, etc.)
5. **Phone Authentication**: Implement SMS-based authentication
6. **Multi-factor Authentication**: Add 2FA support

## Support

For Firebase-specific issues, refer to the [Firebase Documentation](https://firebase.google.com/docs/auth).

For application-specific issues, check the browser console for error messages and refer to the Firebase Authentication error codes documentation. 