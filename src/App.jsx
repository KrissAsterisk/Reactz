import * as React from 'react';

const title = {
    name: "Reactz",
    introduction: "Presents",
    body: `Welcome to my page`
};

class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + " " + this.lastName;
    }
}


const jsArray = [`--1`, `--2`, `--3`];
const makeNoise = () => "AAAAAAAAAAAAAAAAH";
title.defaultSound = makeNoise();

const PageListItem = ({ item }) => {

    let delistedItems = [];
    for (let key in item) {
        switch (key) {
            case "url": {
                var linkToUrl = <a key={item.objectId} href={`http://${item[key]}`}>{item.title}:</a>;
                delistedItems.push(linkToUrl);
                break;
            }
            case "objectId": break;
            case "title": break;
            default: delistedItems.push(<ul key={key}><li>{`${key}: ${item[key]} \n`}</li></ul>)
        }
    }

    return <li> {delistedItems} </li>
}

const PageList = ({ arrayOfWebPageData }) => {
    return (
        <ul>
            {
                arrayOfWebPageData.map((item) => <PageListItem key={item.objectId} item={item} />)

            }
        </ul>
    )
}

const ValidateSearch = ({ searchTerm, arrayOfWebPageData }) => {
    let matches = [];

    let checkEveryItem = (item) => {
        for (let key in item) {
            if (searchTerm === key) {
                matches.push(item[searchTerm]);
            }
        }
    }
    arrayOfWebPageData.forEach(item => checkEveryItem(item));

    return (
        <ul>
            {matches.map(
                (match, index) =>
                    <li key={index}>{match}</li>
            )}
        </ul>
    )

}

const SearchBar = ({ arrayOfWebPageData }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    function displayAndSearchText(searchTerm, { arrayOfWebPageData }) {
        if (searchTerm ?? null) {
            return (
                <div>
                    <p>Looking for: {searchTerm}</p>
                    <ValidateSearch searchTerm={searchTerm.toLowerCase()} arrayOfWebPageData={arrayOfWebPageData} />
                </div>
            )
        }
    }

    const handleSearch = (event) => {

        setSearchTerm(event.target.value);

    }

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleSearch} />
            {displayAndSearchText(searchTerm, { arrayOfWebPageData })}
        </div>
    )
}

const CreateUser = ({ onUserCreation }) => {
    let promptForName = (promptMsg) => {
        let userInput;
        do {
            userInput = prompt(promptMsg);
        } while (userInput === null || undefined)
        return userInput;
    }

    React.useEffect(() => { // needed useEffect() here since CreateUser is called mid-render, causing an error
        const newUser = new User(
            promptForName("Please enter your nickname: "),
            promptForName("Please enter your surname: ")
        );
        onUserCreation(newUser);
    })

    return null;
}

const App = () => {

    const arrayOfWebPageData = [{
        title: "Reactz",
        url: "localhost:9090",
        author: "me",
        num_comments: 3,
        points: 4,
        perfection: 100,
        objectId: 0,
    },
    {
        title: "AuthServer",
        url: "authserver:9000",
        author: "admin",
        num_comments: 0,
        points: 999,
        objectId: 1,
    },
    {
        title: "AnotherAddition",
        url: "0.0.0.0:0000",
        author: "TBD",
        num_comments: null,
        points: null,
        objectId: 2

    }];

    console.log(makeNoise());
    //alert("Welcome new User!");
    const [user, setUser] = React.useState(null); // create a stateful var

    let handleUserCreation = (newUser) => { /* callback func, called with onUserCreation() from child component;
                                               it sets the stateful user var to the value passed to handleUserCreation from child 'CreateUser'
                                            */
        setUser(newUser);
    }
    return (
        <div>
            <CreateUser onUserCreation={handleUserCreation} /> /* call child component HERE - initialize user;
                                                                  create/define the callback function for both the parent and child;
                                                                  aka passing the reference of handleCreation() to the child
                                                                  with the name of onUserCreation so that when it calls it, it runs
                                                                  inside the Parent comp;
                                                               */
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}, {user?.fullName}!</h1>

            <SearchBar arrayOfWebPageData={arrayOfWebPageData} />
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <PageList arrayOfWebPageData={arrayOfWebPageData} />
        </div>

    )
}

export default App
