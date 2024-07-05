# Delivery Fee Calculator App

Welcome to the Delivery Fee Calculator App! This app helps users calculate the delivery fee based on various factors such as cart value, delivery distance, number of items, and order time. Let's get started!

## Features

### Input Fields

1. **Cart Value:** Enter the value of your shopping cart in euros.
2. **Delivery Distance:** Provide the distance between the store and your location in meters.
3. **Number of Items:** Specify the number of items in your shopping cart.
4. **Order Time:** Select the date and time when you're making the order.

### Calculation

Once you've entered all the required information, the app will calculate the delivery fee based on the specified rules:

- A small order surcharge is added if the cart value is less than 10€.
- A base delivery fee is applied for the first 1000 meters, with additional charges for longer distances.
- Surcharge for the number of items above the threshold, with an extra fee for bulk items.
- Free delivery for cart values equal to or more than 200€.
- Rush hour surcharge applies during Fridays from 3 PM to 7 PM browser time.

### Output

The app displays the calculated delivery fee in euros.

## Installation

This app is built using React and TypeScript.

### Prerequisites
- npm (Node Package Manager) installed

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   npm start
   ```
3. Access the application at http://localhost:3000/

## Notes
- Date time field is always pre-populated with current browser's date and time and also it is kept editable for the testing purpose.

