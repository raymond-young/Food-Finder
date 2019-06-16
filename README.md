# Swipe application
Created using Expo

Redux for storing information to be used across screens


`npm install`
`expo start`


# Tools Used
- `Node.js` - An open-source, cross-platform JavaScript runtime environment
- `npm` - A package manager for JavaScript
- `expo` - A tool to help create a React Native Project

React Native: Code is written in JavaScript and React Native compiles that into Java, Objective C or Swift Code depending on the environment.

# Things
## Components
This is how we display things on our screen.
These are the building blocks of our applications, and contain the logic and markup we wish to display.
These can be reused throughout our application.
How to create a component:
- Import the necessary library
- Define the component in a JavaScript class
--	We can define it in JSX, which is a dialect of JavaScript which allows us to put HTML within JavaScript code. Render() contains the necessary markup which will be displayed in our app.
--	Views are fundamental to React Native. Everything must have a parent view.
Component hierarchy
- Components are nested within other components. You have a base component which has sub components, which may have more sub components.
-	App.js contains a component which we will use as our base component.

## State
This is information which can be used for logic or displayed to your device.
It can change dynamically.
It is private to a component.
How to use:
-	Create a constructor (with any inputs it may need)
-	Call a ‘super()’.
-	Set the values for your initial state. (this.state= {} ).	Consider it to be like a python dictionary. It has a key and an object.
You can’t access state directly. You have to use a setState() function which is built into react-native.

## Props
-	So the whole point of defining components is so you can reuse the same components in multiple places. You might have a nicely styled button that you want to use throughout your app. How do you then make the buttons do different things? With props (properties).
-	This is information that is passed to a single component which tells it how it should behave. (Props can be anything from a function, to a string, or whatever. It’s just a piece of data that is used by a component).
-	Data only flow sin one direction in React Native, from parent to child.
-	Parents will pass parameters or data onto children, and the children can use this information.
-	Similar to State, except that State is internal to a component, while props are passed to a component.

## Navigation
- Use the bottomTabNavigator from react-navigation.
- Use the switchNavigator from react-navigation. The BottomTab is nested within the switch Navigator.
- Create an App container. Containers are responsible for managing your app state and linking your top-level navigator to the app environment.
- Every screen in the navigator gets passed a special prop called `navigation`. This navigation object lets us change between screens. We can access this navigation prop with any component linked to our navigation (with the navigators).
For example:
```<Button title="Login" onPress={() => this.props.navigation.navigate("main")}/>```
This will create a button, which, on press, will call a function which changes the screen. In this case, the object is accessing the `navigation` prop, and invoking the `navigate` method. "Main" is the title of the screen which we wish to navigate to (which is defined by the switch, tab, stack, navigator).
See here: https://reactnavigation.org/docs/en/navigation-prop.html


## Map
The map components is actually provided by expo. The actual component is made by AirBnb and made it open source, and it uses an implementation of Google maps. This is only possible in expo, and there's a bunch of components available through expo because of it.
- By default, the MapView takes up the space of the View. If you don't specify the dimensions of a View, it will by default take up the space of the child. Specify the flex in the style to change the dimensions of the view.
- 


# Devs

The DEVS Workshop Series walks through building an application using React Native but through a practical **product-based** mindset. The recordings are available below.

A big thank you to everyone who participated!

# Pre-requisites/Instructions 

The pre-requistes for this app can be found here: https://github.com/devsuoa/workshop-one

## Workshop Three Recording

Recording: https://drive.google.com/open?id=1txfSOYJ0SEISZIXSrjn2yHym3fSo0yDt

## Workshop Two Recording

Recording: https://drive.google.com/file/d/166PVgKSbP_xCqKVHsF-P9zq1hVSBcyDz/view

## Workshop One Recording

The recording is available here: https://drive.google.com/open?id=1tCGRYzMrdPTV6VOKEscXOZvNNioi_KrM
