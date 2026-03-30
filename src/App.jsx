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
    let matches = arrayOfWebPageData.filter(value => value[searchTerm] ?? null)

    let displayMatches = (matches) => matches.map((value, index) => <li key={index}>{value[searchTerm]}</li>)

    return (
        <ul>
            {
                displayMatches(matches)
            }
        </ul>
    )
}

const SearchBar = ({ searchTerm, onSearch }) => {

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" value={searchTerm} onChange={onSearch} />
        </div>
    )
}

const CreateUser = ({ onUserCreation }) => {
    let promptForName = (promptMsg) => {
        let userInput;
        do {
            userInput = prompt(promptMsg);
        } while (userInput == '' || userInput == undefined)
        return userInput;
    }
    React.useEffect(() => {
        const newUser = (new User(
            promptForName("Please enter your nickname: "),
            promptForName("Please enter your surname: ")
        ));
        localStorage.setItem('user', JSON.stringify(newUser));
        onUserCreation(newUser);
    }, [onUserCreation]);

    return null;
}

const App = () => {
    console.log(makeNoise());
    const arrayOfWebPageData = [
        {
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

        },
        {
            title: "ANDANOTHER",
            url: "0.0.0.0:0000",
            author: "TBD",
            num_comments: null,
            points: null,
            objectId: 3
        }
    ];

    const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'react');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    React.useEffect(() => {
        localStorage.setItem('search', searchTerm);
    }, [searchTerm])

    const [user, setUser] = React.useState(() => {
        const stored = localStorage.getItem('user');
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        return new User(parsed.firstName, parsed.lastName);
    });

    let handleUserCreation = (newUser) => {
        setUser(newUser);
    }

    let displayLookingForTextAndResults = (searchTerm) => {
        if (searchTerm ?? null) {
            return (
                <div>
                    <p>Looking for: {searchTerm}</p>
                    <ValidateSearch searchTerm={searchTerm} arrayOfWebPageData={arrayOfWebPageData} />
                </div>
            )
        }
    }

    let isUserInit = (user) => {
        if (!user) {
            return <CreateUser onUserCreation={handleUserCreation} />

        }
    }

    const soughtList = arrayOfWebPageData.filter(value => value.title.toLowerCase().includes(searchTerm));

    return (
        <div>
            {
                isUserInit(user)
            }
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}, {user?.fullName}!</h1>

            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            {
                displayLookingForTextAndResults(searchTerm)
            }
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <PageList arrayOfWebPageData={soughtList} />
        </div>

    )
}

export default App
