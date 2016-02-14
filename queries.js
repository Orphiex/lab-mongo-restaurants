// Warm up:
// 1. List out all available cuisine from the whole dataset and sort them in alphabetical order
db.getCollection('restaurants').find('cuisine').sort();

// 2. Find out all available cuisine from the restaurants that are located on Cross Bay Boulevard and whose address uses zip code 11414.
db.restaurants.find({
  'address.street': 'Cross Bay Boulevard',
  'address.zipcode': '11414'
});


// 3. Find the name and address of the Steak House owned by your WDI-HK-10 instructor (Hint: You may want to use regular expression).
db.restaurants.find({
  'name': /^Willie/
});

// ------------------------------------------------------

// Pizza:
// 1. List out the name of all restaurants which contain the word Pizza in the cuisine but DO NOT contain the word Pizza or Pizzeria in the restaurant name (Hint: use regular expression).
db.restaurants.find({
  'cuisine': 'Pizza',
  'name': {
    $nin [/Pizza/, /Pizzeria/]
  }
});

// 2. List out the name of all straight A (i.e. the restaurant has only received A grade ever) restaurants which contain the word Pizza in the cuisine and are located in the Queens borough (Hint: you may want to first find out how many available grade values we have in the entire dataset).
db.restaurants.find({
  'cuisine': /Pizza/,
  'borough': 'Queens',
  'grades.grade': {
    $nin : ['B', 'C', 'P', 'Z', 'Not Yet Graded']
  }
});

// db.restaurants.find({'cuisine': /Pizza/, 'borough': 'Queens', 'grades.grade': {$nin : [!'A']}});
// I'm pretty sure this one didn't work, because I got about 150 more results than I did with the other method.  Still, it definitely did something.

// ------------------------------------------------------

// Hamburger:
// 1. You are hungry and feel like having a hamburger. Find the number of restaurants listed Hamburgers as their main cuisine.
db.restaurants.find({
  'cuisine': 'Hamburgers'
});

// 2. Geez, there are way too many of them. Let's narrow down our search. You are in Manhattan right now so let's find how many restaurants listed Hamburgers as their main cuisine in the Manhattan borough.
db.restaurants.find({
  'cuisine': 'Hamburgers',
  'borough': 'Manhattan'
});

// 3. Let's have something nice and get rid of the McDonald's in the results. Find how many restaurants listed Hamburgers as their main cuisine in Manhattan and exclude all Mcdonald's (Note: In the data set, McDonald's was presented in inconsistent ways, e.g. McDonald's and McDonald'S. So please use the regular expression /McDonald/ in your query).
db.restaurants.find({
  'cuisine': 'Hamburgers',
  'borough': 'Manhattan',
  'name': {
    $nin: [/McDonald/, /Mcdonald/]
  }
});

// 4. Hmm... we are getting closer. Let's also get rid of Burger King as well.
db.restaurants.find({
  'cuisine': 'Hamburgers',
  'borough': 'Manhattan',
  'name': {
    $nin: [/McDonald/, /Mcdonald/, /Burger King/]
  }
});

// 5. There are still plenty of choices. Maybe you should just pick one closer to your home. Find out the list of distinct street based on the results of Question 4.
db.restaurants.distinct('address.street', {
  'cuisine': 'Hamburgers',
  'borough': 'Manhattan',
  'name' : {
    $nin: [/McDonald/, /Mcdonald/, /Burger King/]
  }
});

// 6. Alright, you are just a block away from Pearl Street. Find the name of the Hamburger restaurant (i.e. your query should return the name of the restaurant only) on Pearl Street. Your query should now yield exactly one restaurant. What is it? (Submit the query and also the name of the restaurant as a comment)
db.restaurants.find('name', {
  'cuisine': 'Hamburgers',
  'borough': 'Manhattan',
  'address.street': 'Pearl Street'
  'name' : {
    $nin: [/McDonald/, /Mcdonald/, /Burger King/]
  }
});

// Name of Restaurant: Burger Burger

// ------------------------------------------------------

// Hard:
// 1. Find the name of the restaurants which listed Japanese as their main cuisine and have exactly 9 grades.
db.restaurants.find({
  'cuisine': 'Japanese',
  'grades': {
    $size: 9
  }
});
