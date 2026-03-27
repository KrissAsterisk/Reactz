
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


const jsArray = [`el1`, `el2`, `el3`];
const makeNoise = () => "AAAAAAAAAAAAAAAAH";
title.defaultSound = makeNoise();

const PageListItemFilter = ({ item }) => { /* Of course this is redundant and doesn't
                                              even increase readability, but it's
                                              here to help visualize how props, aka properties,
                                              can be transmitted */
                                              // will be removed from main branch

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

const PageListItem = ({ thisVarCanBeAnything: item }) => {

    return <PageListItemFilter item={item} />
}

const PageList = ({ list: arrayOfWebPageData }) => { /* as discovered later, the parameter passed onto the method can be anything;
                                                    however, there seem to be params that change what is passed on;
                                                    such is the case with list = {} here;
                                                    ---------------------------------------
                                                    need to extract the arrayList out of the list 
                                                    that was created when passed to List using
                                                    list = {var}. */
    return (
        <ul>
            {
                arrayOfWebPageData.map((item) => <PageListItem key={item.objectId} thisVarCanBeAnything={item} />) // suboptimal identifier chosen to prove a point

            }
        </ul>
    )
}


const Search = () => {

    const handleChange = (event) => {

        console.log(event);


        console.log(event.target.value)
    }

    const handleClick = (event) => {

        console.log(event)

        console.log("Clicked on Search Box!")
        event.stopPropagation(); // for testing rm l8r - stops any other handles that run this same function
    }

    return (
        <div>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} onClick={handleClick} onClickCapture={handleClick} />
        </div>
    )
}

const App = () => {

    const listOfWebPageData = [{
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

            <Search />
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <PageList list={listOfWebPageData} />
        </div>

    )
}

export default App
