import React, {Component} from 'react';
import Box from './Box'

class Game extends Component {

    constructor(){
        super()
        //This is our ships, and how big they are
        this.listOfShips = [4,3,2]
        this.state = {
            //Will have our final array of ships populated in it
            gameBoard: this.bigFunction(),
            shipHealth: this.listOfShips
        }
    }

    bigFunction() {
        //Creates the wireframe for our array
        let tempArray = Array(10).fill().map(n => Array(10).fill(0));

        //Make sure the god dang thing works
        console.log(tempArray)

        //Loop to create the actual ships
        for(let i = 0; i< this.listOfShips.length; i++){
            //Unique ship identifier
            let increment = i+1;
            // Creates the ship, using the index of the ship array, passes in our wireframe, and the unique identifier
            tempArray = this.placeShip(this.listOfShips[i], tempArray, increment)
        }

        //Lets us see the populated array
        console.log(tempArray)

        let check = this.checkYourWork(tempArray)

        while (check === false){
            tempArray =  this.bigFunction();
            check = this.checkYourWork(tempArray);
        }

        return tempArray; 
    }

    checkYourWork = (arr) => {
        let x = 0;
        for (let i = 0; i < this.listOfShips.length; i++){
            x += this.listOfShips[i]; 
        }
        let y = 0;
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j<arr[i].length; j++){
                if (arr[i][j] !== 0){
                    y += 1;
                }
            }
        }
        if (x !== y){
            return false;
        } else if (x === y) {
            return true;
        }
    }

    placeShip(arg, arr, increment) {
        //Choose either a vertical or horizontal ship placement
        let flipCoin = Math.floor(Math.random()*2)

        //Grab a Random index for the array
        let rIndexOne = Math.floor(Math.random()*arr.length)
        let rIndexTwo = Math.floor(Math.random()*arr.length)

        //Make sure that the place we are setting our ship into is not taken
        while (this.collisionFunct(flipCoin, rIndexOne, rIndexTwo, arr, arg) === false){
            //If it was taken, find a new place
            rIndexOne = Math.floor(Math.random()*arr.length)
            rIndexTwo = Math.floor(Math.random()*arr.length)
        }

        //0 means we are looking vertically
        if (flipCoin === 0){
            //Assigns the indexes with our unique idenifier
            for(let i = 0; i < arg; i++){
                arr[rIndexOne+i][rIndexTwo] = increment;
                
            }
            //0 means we are looking horizontally
        } else if (flipCoin === 1){
            for(let i = 0; i < arg; i++){
                //Assigns the indexes with our unique idenifier
                arr[rIndexOne][rIndexTwo+i] = increment;
            }
        }
        //Returns the array with the ship inside of it
        return arr;
    }

    collisionFunct(coin, rI1, rI2, arr, arg) {
        //I doing a vertical check if the coin was 0
        if (coin === 0){
            //I create a loop to check every index for the size of my ship
            for(let i = 0; i<arg; i++){
                //I create a variable to return my boolean statement
                let x = "";
                //I make sure that the place I am checking exists in my array
                if (rI1+i < arr.length-1 && rI1+arg < arr.length-i){
                    //I check if the value I am looking at is not a 0
                    if (arr[rI1+i][rI2] !== 0){
                        //If I am not a 0, do not write
                        x = false;
                    } else{
                        //I am a 0, go ahead and write
                        x = true;
                    }
                } else {
                    //I dont exist in the array, dont write anything
                    x = false;
                }
                //Return my boolean at the end of my loops
                if (i+1 === arg){ return x}
            }// Horizontal Checking below
        } else if (coin === 1){
            //I create a loop to check every index for the size of my ship
            for(let i = 0; i<arg; i++){
                //I create a variable to return my boolean statement
                let x = "";
                //I make sure the place I am checking exists in my array
                if (rI2+i < arr.length-1 && rI2+arg < arr.length-i){
                    //I check fi the value I am looking at is not a 0
                    if (arr[rI1][rI2+i] !== 0){
                        //If I am not a 0, do not write
                        x = false;
                    } else{
                        //I am a 0, go ahead and write
                        x = true;
                    }
                    //I dont exist in the array, dont write anything
                } else { x = false;}
                //Return my boolean at the end of my loops
                if (i+1 === arg){ return x}
            }
        }
    }

    boxPopulation(arr) {
        let finalArr = [];
        for( let i = 0; i < arr.length; i++){
            finalArr.push(arr[i].map((value,index) => {return(
                <Box 
                    value = {value}
                    index = {index}
                    tempFunt = { this.tempFunt }
                />)}
            ));
        }

        console.log(finalArr)
        return finalArr
    }

    tempFunt = (value) => {
        if (  this.listOfShips[value-1] !== 0){
            this.listOfShips[value-1] -= 1;
            this.setState({shipHealth: this.listOfShips})
            console.log(this.state.shipHealth)
        }
    }


    render(){
        let start = this.boxPopulation(this.state.gameBoard)
        return (
            <div className = "centerBoard">
                <div>

                    <span className = "squareIt">
                        { start }
                    </span>
                    <p className = "outerBox">
                        Enemy Ship Health: <br/>
                        <br/>
                        Ship 1: {this.state.shipHealth[0]} <br/>
                        Ship 2: {this.state.shipHealth[1]} <br/>
                        Ship 3: {this.state.shipHealth[2]} <br/>
                    </p>
                </div>

            </div>
        );
    }
}

export default Game;