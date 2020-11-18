# Final Project

## College Basketball Model

## Description: 
* Create an app for a user to build their own statistical models to predict college basketball games' outcomes!

## Table of Contents
* Wireframe
* Flow Diagram
* App
* Features
* Future Additions
* API Used
* Languages Used
* Packages/Libraries
* Contribute
* Issue and Resolutions
* Submit a Ticket
* Resources
* Disclaimer 

## Wireframe
* Signup: <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/tree/main/images/Signup.png)

* See Images Folder: AllDrinks.png

* All Show Drinks: <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/tree/main/images/All_Team_Stats.png)

* See Images Folder: AllShowDrinks.png

* By Spirit: <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/tree/main/images/All_Team_Stats.png)

* See Images Folder: BySpirit.png

* Random Drink: <br />
![alt text](https://github.com/Bmdawley22/CBB-Model-Frontend/tree/main/images/All_Team_Stats.png)

* See Images Folder: RandomDrink.png

* Spirit Show Drink: <br />
![alt text](https://github.com/Bmdawley22/drink-mixer/blob/main/Images/SpirtShowDrink.png)

* See Images Folder: SpiritShowDrink.png

## Flow Diagram

![alt text](https://github.com/Bmdawley22/drink-mixer/blob/main/Images/FlowDiagram.png)

* See Images Folder: FlowDiagram.png

## App

- **App:** drink-mixer.surge.sh

## Features
* Enter App only if 21 and Older
* Top Spotlight Drink, Tavern, and Article
* Random Drink Generator
* Add Drinks to a Drink List
* Find a drink by spirit
* View a Drink List of all drinks
* View directions on how to make a drink
* Add a new Drink

## Future Additions
* User Login, Sign Up, and Sign Out of App
* Create a database to store all drinks
* Add likes and comments to drinks

## API Used

- **TheCocktailDB:** https://www.thecocktaildb.com/api.php

## Languages Used
* HTML
* CSS
* JavaScript

## Packages/Libraries
* React
* React Router
* React Router Dom
* Axios
* Google-Map-React
* @iconify/react
* @iconify/icons-mdi

## Contribute
- **Source Code:** https://github.com/Bmdawley22/drink-mixer

## Issue and Resolutions
### Issue
* Displaying Data to ingredients and measurements on a drink
    * API stored each ingredient and measurement as a different name
    * Example: <br />
![alt text](https://github.com/Bmdawley22/drink-mixer/blob/main/Images/IngredientsAPI.png)

* See Images Folder: IngredientsAPI.png

### Resolution
* Create a for loop to map over in the render
    * Result: Able to create match naming conventions to return the data from the API
    * Cause: adding a for loop at the begining on the page render then map over that array in order to only return results that had a value and not null. This works for both ingredients and measurements
    * Code Used: 
    ```
        let ingredients = [];
        for (let i = 1; i < 16; i++) {
            const temp = `strIngredient${i}`;
            ingredients.push(props.randomDrink[temp]);
        }

        {ingredients.map((ingredient, id) => {
            return (
                <div key={id}>
                    {ingredient ? <li >{ingredient}</li> : null}
                </div>
            )
        })}
    ```

### Issue
* Firebase database to store information
    * Using Firebase database to store all drinks in order to save drinks that are added each time

### Resolution
* Imported firebase and used .ref to store to data base
    * Result: data was saving to the database; however, having difficulites rendering that data to be used throughout the app
    * Cause: adding .ref to store directly to the database, not able to return data from the database
    * Code Used:
    ```
        import firebase from 'firebase';

        const drinks = firebase.database();
        const drink = drinks.ref('drinks');
        for (let i = 0; i < this.state.drinks.length; i++) {
            drink.push({ ...this.state.drinks[i]});
        }
    ```
    * **Issue Ticket Submission:** https://git.generalassemb.ly/jd-seir-4/project-3/issues/3

    * **Firebase:** https://console.firebase.google.com/project/drink-mixer-app/overview 

## Submit a Ticket
* If a problem occurs with the Drink Mixer or have suggestions for updates, please add them here: 
https://github.com/Bmdawley22/drink-mixer/issues

- **Notes:** Responses can take up to 48 hours. Thank you for mixing!

## Resources
* Contributors:
    - Andrea Bonetto
    - Brady Dawley
    - Tim Kaiser
* API:
    - https://www.thecocktaildb.com/api.php
* Websites:
    - **ReactJS** https://reactjs.org
    - **w3schools** https://www.w3schools.com/
    - **MDN web docs** https://developer.mozilla.org/en-US/
    - **stackoverflow** https://stackoverflow.com/
    - **GeeksforGeeks** https://www.geeksforgeeks.org
    - **GitHub Docs** https://docs.github.com/en
    - **Google Fonts** https://fonts.google.com/
    - **CSS-TRICKS** https://css-tricks.com/
    - **Firebase** https://css-tricks.com/intro-firebase-react/
    - **Google Maps React** https://tomchentw.github.io/react-google-maps/
* Instructors: 
    - Casey R Harding
    - David Magbee
    - Isha Arora
    - Leah Mattern
* SEI Classmates

## Disclaimer

**PLEASE DRINK RESPONSIBLY**