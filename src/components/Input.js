import React from 'react';




const validateCard = (number) => {
    let numberLength = number.length;
    let numberToString = number.toString();

    let amexStart = numberToString.startsWith("34") || numberToString.startsWith("37"); 
    let discoverStart = numberToString.startsWith("6011");
    let mastercardStart = 
        numberToString.startsWith("51") ||
        numberToString.startsWith("52") ||
        numberToString.startsWith("53") ||
        numberToString.startsWith("54") ||
        numberToString.startsWith("55");
    let visaStart = numberToString.startsWith("4");

   
    const amex = numberLength === 15 && amexStart;
    const discover = numberLength === 16 && discoverStart;
    const mastercard = numberLength === 16 && mastercardStart;
    const visa = (numberLength === 13 || 16) && visaStart;

    
    if (amex || discover || mastercard || visa) {
        let reverseNumber = number.split("").reverse().join("");
        let stored = [];
        let total = null;
        for (let i = 0; i < numberLength; i++) {
            if ((i % 2) === 1) {
                let number = reverseNumber[i] * 2;
                if (number > 9) {
                    let numToSplit = number.toString();
                    let numToArray = Array.from(numToSplit);
                    let firstNum = parseInt(numToArray[0]);
                    let secondNum = parseInt(numToArray[1]);
                    total += firstNum + secondNum;
                } else {
                    stored.push(number);
                    total += number;
                }
            }
            else {
                let number = reverseNumber[i] * 1;
                total += number;
            }
        }
        if (total % 10 === 0) {
            return true;
        } else {
            return false;
        }
    } 
 }


class Input extends React.Component {
    constructor(props) {
    super(props);
        this.state = { 
            creditCardNumber: "",
            message: "Unesite brojeve kartice",
            isValid: validateCard(''),
            cardType: "Nepoznato",
            
        };
    }

    myFunc = event => {
        const newValue = event.target.value
        if (isNaN(newValue)) {
            this.setState({
                message: "Unesite brojeve kartice"
            })
        } else if (newValue.length < 18){
            this.setState({
                creditCardNumber: newValue,
                message: "",
                isValid: validateCard(newValue),
                
            })
        }
        const numberLength = newValue.length;
        let numberToString = newValue.toString();
        let amexStart = numberToString.startsWith("34") || numberToString.startsWith("37");
        let discoverStart = numberToString.startsWith("6011");
        let mastercardStart = 
            numberToString.startsWith("51") ||
            numberToString.startsWith("52") ||
            numberToString.startsWith("53") ||
            numberToString.startsWith("54") ||
            numberToString.startsWith("55");
        let visaStart = numberToString.startsWith("4");
    
       
        const amex = numberLength === 15 && amexStart;
        const discover = numberLength === 16 && discoverStart;
        const mastercard = numberLength === 16 && mastercardStart;
        const visa = (numberLength === 13 || 16) && visaStart;
        if (amex) {
            this.setState({ 
                cardType: "Amex",
                
            })
        } else if (discover) {
            this.setState({
                cardType: "Discover",
              
            })
        } else if (mastercard) {
            this.setState({
                cardType: "Mastercard",
                
            })
        } else if (visa) {
            this.setState({ 
                cardType: "Visa",
                
            })
        }
    }

    render() {
        return (
            <div className="validator-container">
                <div className="input-container">
                                                     
                    <input 
                        id="input"
                        type="text"
                        placeholder="Unesite brojeve kreditne kartice..."
                        onChange={this.myFunc}
                        value={this.state.creditCardNumber}
                        className={this.state.isValid ? 'validna' : 'nije validna'}
                    >
                    </input>
                </div>
                <p className={this.state.isValid ? 'validna' : 'nije validna'}>
                    {this.state.isValid ? 'Kartica je validna' : 'Kartica nije validna'}
                </p>
                <p>Tip kartice: {this.state.isValid ? `${this.state.cardType}` : "Nepoznato"}</p>
            </div>
        )
    }
}

export default Input;