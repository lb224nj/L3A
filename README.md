# Budget Insight - Your Personal Finance Tracker
The aim of this application is to help you organize and get insights into your spending habits. This is done by giving you ways to categorize expenses and analyzing spending patterns so that you can make informed financial decisions.

## Features
This first version of the application includes features such as:
- Add expenses by category (like clothing) and amount / cost.
- View yearly total expenses for the specific categories.
- View average monthly expense for a specific category.
- Save and load data into JSON format for simple tracking.

Keep an eye on updates since we hope to implement more features in the future.

## Requirements:
Before you begin, make sure you meets the following requirements:
- You have installed Node.js (https://nodejs.org/en) (version 21 or later since it was developed in v21.6.1)
- You have a terminal that supports interactive input/output.

## Installation Guide
1. Clone the public repo to your local machine:
````
git clone https://github.com/lb224nj/L3A.git

````

2. NAvigate to the app folder:
````
cd L3A

````

3. Install dependencies:

````
npm install

````

## Usage

1. Run the app:

````
npm start

````

2. Interact with the app:
- Enter the corresponding number depending on what you want to do by entering the corresponding number (1-4), (via the temrinal).

## Examples
````

npm start

> start
> node src/index.js

Welcome to the Budget View!
What do you want to do?
1. Add an expense to a category
2. View yearly total expenses for a category
3. View average monthly expenses for a category (based on number of months it is included in, not all 12 months)
4. Exit tha app
Choose an option (1-4): 1
Please select a month:
1. January
2. February
3. March
4. April
5. May
6. June
7. July
8. August
9. September
10. October
11. November
12. December
Enter the number of specific month you want to select: 4
You have selected  April
Select an expense category:
1. groceries
2. utilities
3. entertainment
4. transportation
5. clothing
6. education
7. healthcare
8. rent
9. other
Enter the number of the specific category you want to select: 4
You have selected transportation
Enter the expense amount: 20
Added $20 to transportation for April
Total expenses for April: $47
What do you want to do?
1. Add an expense to a category
2. View yearly total expenses for a category
3. View average monthly expenses for a category (based on number of months it is included in, not all 12 months)
4. Exit tha app
Choose an option (1-4):

````

The data will be saved in data.json:


````
{
  "January": {
    "month": "January",
    "expenses": {
      "groceries": 2562,
      "utilities": 121,
      "entertainment": 0,
      "transportation": 0,
      "clothing": 0,
      "education": 0,
      "healthcare": 0,
      "rent": 20,
      "other": 0
    }
  },
  
````

## For Developers
- The L2M (submodule). ensure this is updated before running the app. More calculations from said submodule can be implemnted to further improve the application.
- Contributions are happily recieved. Please fork the repository and submit your pull request.

## License
This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.