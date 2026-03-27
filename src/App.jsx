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

const ValidateSearch = ({ searchTerm, arrayOfWebPageData }) => { /* Properties come as one {var1, var2, ...}*/
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

    const handleChange = (event) => {

        setSearchTerm(event.target.value);

    }

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
            {displayAndSearchText(searchTerm, { arrayOfWebPageData })}
        </div>
    )
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
    const newUser = new User("John", "Timothy");

    return (
        <div>
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}, {newUser.fullName}!</h1>

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
