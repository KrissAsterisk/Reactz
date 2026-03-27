
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


let jsArray = [`el1`, `el2`, `el3`];
let makeNoise = () => "AAAAAAAAAAAAAAAAH";
title.defaultSound = makeNoise();

function List() {
    const list = [{
        title: "Reactz",
        url: "localhost:9090",
        author: "me",
        num_comments: 3,
        points: 4,
        gayness: 100,
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
    return (
        <ul>
            {
                list.map((item) => {

                    let delistedItems = [];

                    for (let key in item) {
                        switch (key) {
                            case "url": {
                                var linkToUrl = <a href={`http://${item[key]}`}>{item.title}:</a>;
                                delistedItems.push(linkToUrl);
                                break;
                            }
                            case "objectId": break;
                            case "title": break;
                            default: delistedItems.push(<ul><li key={key}>{`${key}: ${item[key]} \n`}</li></ul>)
                        }
                    }

                    return <li key={item.objectId}>

                        {delistedItems}

                    </li>

                })

            }
        </ul>
    )
}

function Search() {
    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    )
}

function App() {

    console.log(makeNoise());
    let newUser = new User("John", "Timothy");

    return (
        <div>
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}, {newUser.fullName}!</h1>

            <Search />
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <List />
        </div>

    )
}

export default App
