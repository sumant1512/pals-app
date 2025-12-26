# Pals Coupon Scanner App

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## 🚀 How to use

- Install packages with `yarn` or `npm install`.
- Run `yarn start` or `npm run start` to start the bundler.
- Open the project in a React runtime to try it:
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)
  - Web: Any web browser
- When it's time to customize your runtime, refer to the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/) guide!

## Publishing

- Deploy the native app to the App store and Play store using this guide: [Deployment](https://docs.expo.dev/distribution/app-stores/).
- Deploy the website using this guide: [Web deployment](https://docs.expo.dev/distribution/publishing-websites/).

## 📝 Notes

- Learn more about [Universal React](https://docs.expo.dev/).
- See what API and components are [available in the React runtimes](https://docs.expo.dev/versions/latest/).
- Find out more about developing apps and websites: [Official guides](https://docs.expo.dev/guides/).

## ✅ Features Added

🔐 Login Feature Added
Implemented mobile number based login functionality with OTP verification only for Dealers.

♻️ Shared Error Modal Component Added
Created a reusable error modal component for consistent error display across the application.

⚠️ Error Modal for Send OTP API
Integrated error modal to display meaningful feedback if sending OTP fails.

⚠️ Error Modal for Verify OTP API
Integrated error modal to display meaningful feedback if Verify OTP fails.

⚠️ Error Modal for Get User Info Api
Integrated error modal to display meaningful feedback if get User info ai fails.

✅ Error Modal for Verify OTP API
Added error handling modal for scenarios where OTP verification fails, improving user experience.

### 🛠️ Role-based UI on User Dashboard

- Implemented role-based UI on the `DashboardScreen`.
- If the logged-in user is a **Dealer**, they will see their own Pals Credit summary and a button to scan coupons.
- If the logged-in user is an **Admin**, they will see a dedicated section (card) to add new dealers.
- This allows both Admin and Dealer users to have different rights and access specific to their role within the application.

## ❌ Features Removed

- 💳 **"Redeem Now" Modal & API Removed from DashboardScreen**  
  The Redeem Now modal and associated functionality were removed from the `DashboardScreen`.  
  However, the modal component still exists in the project and can be reused.  
  The removed API was:

  ```http
  POST /api/coupon/credit
  ```
