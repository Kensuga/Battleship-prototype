import React, {Component} from 'react';
import Box from './Box'

class Game extends Component {
    constructor(){
        super()
        this.state = {
            gameBoard: this.bigFunction()
        }
    }

    bigFunction() {
        let tempArray = Array(10).fill().map(n => Array(10).fill(0));
        let firstShip = 4;
        let secondShip = 3;
        let thirdShip = 2;

        this.placeShip(firstShip, tempArray);
        this.placeShip(secondShip, tempArray);
        this.placeShip(thirdShip, tempArray);
        return tempArray;
    }

    placeShip(arg, arr) {
        let flipCoin = Math.floor(Math.random()*2)
        let rIndexOne = Math.floor(Math.random()*arr.length)
        let rIndexTwo = Math.floor(Math.random()*arr.length)

        if (flipCoin === 0 && this.collisionFunct(flipCoin, rIndexOne, rIndexTwo, arr, arg)){
            for(let i = 0; i < arg; i++){
                arr[rIndexOne+i][rIndexTwo] = 1;
                
            }
        } else if (flipCoin === 1 && this.collisionFunct(flipCoin, rIndexOne, rIndexTwo, arr, arg)){
            for(let i = 0; i < arg; i++){
                arr[rIndexOne][rIndexTwo+i] = 1;
            }
        }

        return arr;
    }

    collisionFunct(coin, rI1, rI2, arr, arg) {
        if (coin === 0){
            for(let i = 0; i<arg; i++){
                let x = "";
                if (rI1+i < arr.length-1){
                    if (arr[rI1+i][rI2] !== 0){
                    } else{
                        x = true;
                    }
                } else {
                    x = false;
                }
                if (i+1 === arg){ return x}
            }
        } else if (coin === 1){
            for(let i = 0; i<arg; i++){
                if (rI1+i < arr.length-1){
                    if (arr[rI1][rI2+i] !== 0){
                        return false;
                    } else{
                        return true;
                    }
                } else { return false;}
            }
        }
    }

    boxPopulation(arr) {
        let finalArr = [];
        for( let i = 0; i < arr.length; i++){
            finalArr.push(arr[i].map((value,index) => <Box 
                value = {value}
                index = {index}
            />));
        }
        return finalArr;
    }


    render(){
        let start = this.boxPopulation(this.state.gameBoard)
        return (
            <div className = "squareIt">
                { start }
            </div>
        );
    }
}

export default Game;