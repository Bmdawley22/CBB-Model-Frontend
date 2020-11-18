# Final Project

## College Basketball Model

## Description: 
* Create an app for a user to build their own statistical models to predict college basketball games' outcomes!  
Users will be able to make as many models as they want and use them to copare results for completed or future games

## Table of Contents
* Wireframe
* ERD
* App
* User Stories
* Future Additions
* Minimum Viable Product
* Packages/Libraries
* Source Code
* Resources


## Wireframe
* Signup: <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Signup.png)

* Login <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Login.png)

* All Team Stats <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/All_Team_Stats.png)

* All Team Differentials <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Stat_Differential.png)

* Build Model <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Build_Model.png)

* Model Results <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Model_Results.png)

* Predictor <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Predictor.png)

* Game History <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/Game_History.png)


## ERD 

![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/blob/main/images/ERD.png)

## App

- **App:** https://cbb-model.surge.sh

## User Stories
* As a use I want to be able to, create an account and login
* As a use I want to be able to, view team stats from database and search for teams
* As a use I want to be able to, view how each teams stats compare to the average for that stat
* As a use I want to be able to, build your own model by selecting what you think are the most important stats
* As a use I want to be able to, view all of your models by selecting the model
* As a use I want to be able to, based on selected model, input team names to be able to predict game score

## Future Additions
* Edit created models in the database
* Add games to a "game history" table in my database
* Display model results based on the game history
* Ability to run regression on game history with model to optimize model weights

## MVP Goals:

* Bronze:
    * Minimum Goals:
        1. Signup
        2. Login
        3. Verify user
        4. Build a model
        5. View all created models by user, selected model to be used for the app
        6. View all team stats
        7. View all team stat differentials
        8. Input team names for a matchup, predict score based on selected model
    * Styling: Plain background with correct formatting

* Silver:
    * Nice to Have:
        1. App instructions page
        2. Edit user info
        3. Edit created user models
        4. Add games to table in database
    * Styling: Friendly UI for easy app navigation

* Gold:
    * High Goal:
        1. View, update, remove game history table 
        2. Show results on models page based on selected model and games added
        3. Run regression on selected model to optimize weights based on games added 
        4. User imports data for different dates
    * Styling & Functionality: Remove bugs and good error handling

## Languages Used
* HTML
* CSS
* JavaScript

## Packages/Libraries
* React
* React Router
* React Router Dom
* Express
* Postgres
* Sequelize

## Source Code
Frontend: https://github.com/Bmdawley22/CBB-Model-Frontend
Backend: https://github.com/Bmdawley22/CBB-Model-Backend

## Resources
* Contributors:
    - Brady Dawley
* Stats from:
    - https://www.sports-reference.com/cbb/seasons/2020-school-stats.html
    - https://www.sports-reference.com/cbb/seasons/2020-opponent-stats.html

* Websites:
    - **ReactJS** https://reactjs.org
    - **w3schools** https://www.w3schools.com/
    - **MDN web docs** https://developer.mozilla.org/en-US/
    - **stackoverflow** https://stackoverflow.com/
    - **GeeksforGeeks** https://www.geeksforgeeks.org
    - **GitHub Docs** https://docs.github.com/en
    - **Google Fonts** https://fonts.google.com/
    - **CSS-TRICKS** https://css-tricks.com/
