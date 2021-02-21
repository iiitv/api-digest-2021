# THEME: TRAVELLING

## Problem Statement
Currently Data is the key to advance in this modern world, but that data is of not much use if it is distributed.

Currently there is no single platform in which you can enter a location and it will fetch you all details about it, Example Hospitals, Schools near that location, AQI etc and if you need multiple details about a location then you have to go to multiple apps and also sometimes also apply filters on it. Now suppose if a user needs to see all these details for multiple locations.If a user needs to save it for comparison or something else then it becomes even worse because then he have to put similar location data in a single place.

## Solution 
One Step Solution is our Platform Travel-Manager
Basically Travel Manager is a platform at which you can come and enter a location and it will fetch you most of the details about it, Like Weather, AQI, Schools near it etc.

## Features Offered
- Show Weather along with forecast for next 8 days(Along with Graph).
- Show AQI(Along with concentrations of different Things like NO2 etc).
- Showing Schools near that location.
- Showing Hospitals near that location.
- Showing Restaurants near that location.
- User can print Page

## Work To DO
- Currently the data which is being used to show schools, Hospitals and Restaurants is not dynamic and We have made raw data for it, The Reason being google maps api provides the features of making this dynamically but it needs billing to be active for that.
We also tried to use API For Hospitals and schools and after retriving Data from it, then after wards plotting them by using markers in place of their latitute and longitude but we dropped down that idea, Because all those data majorly is of US. So it was not feasible to build on this.
- Will also add some more features like Good Places to visit by Giving option of like and comment in order to increase popularity of good places.































# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
