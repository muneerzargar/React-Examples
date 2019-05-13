This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `Application installation`

Run npm install to load all the necessary dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Application Description

The application is developed using the following front end technologies 
  - Html5, CSS3, React, Bootstrap 4, Axios.
 
 The components are divided in stateless functional components and class based components.
   App.jsx and CNJokesList.jsx are the main drivers of the appilcation as they are responsible for state management and take care of the      behavioral logic. Stateless functional components are presentational drivers of the application and are driven by props.  
  - SFC(stateless functional component) reduce lot of code, hence the code will become clean, easy to debug and optimised.
  - Validation of the password is being handled with regex validating the exceptions and only allowing lowercase strings followed by           pattern check in the function.
  
