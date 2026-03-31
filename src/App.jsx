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
                var linkToUrl = <a key={item.objectId} href={`http://${item[key]}`}>{item.title || null}:</a>;
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

const InputWithLabel = ({ id, type = "text", searchTerm, isFocused, onInputChange, children }) => {

    const inputRef = React.useRef();

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused])

    return (
        <React.Fragment>
            <label htmlFor={id}>{children}</label>
            &nbsp; {/* Non Breaking SPace - used for creating a space that prevents an automatic line break */}
            <input id={id} type={type} value={searchTerm} ref={inputRef} onChange={onInputChange} /> {/*autoFocus -> {true} byDefault*/}
            {React.Children.forEach(children, (child, index) => {
                console.log(child);
                console.log(index);
            })}
        </React.Fragment>
    )
}

const CreateUser = ({ onUserCreation }) => {
    const invalidInputCondition = (userInput) => {
        if (userInput == '') {
            return true;
        }
        return false;
    }

    const normalizeInput = (userInput) => {
        return userInput?.replace(/ /g, "");
    }
    const persistantPrompt = (promptMsg) => {
        let userInput;
        do {
            userInput = normalizeInput(prompt(promptMsg));
        } while (invalidInputCondition(userInput))
        return userInput;
    }



    React.useEffect(() => {
        let createUser = () => {
            return new User(
                persistantPrompt("Please enter your nickname: "),
                persistantPrompt("Please enter your surname: ")
            );
        }
        let newUser;
        do {
            newUser = createUser();
        } while (newUser.firstName == undefined || newUser.lastName == undefined)
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

    //------------------HOOK------------------------
    const useStorageState = (key, initialState) => {
        const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

        React.useEffect(() => {
            localStorage.setItem(key, value);
        }, [value, key])

        return [value, setValue];
    }
    //------------------HOOK------------------------

    const [searchTerm, setSearchTerm] = useStorageState('search', '');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    }

    let displayLookingForTextAndResults = (searchTerm) => {
        if (searchTerm ?? null) {
            return (

                <> {/*<React.Fragment>*/}
                    <p>Looking for: {searchTerm}</p>
                    <ValidateSearch searchTerm={searchTerm} arrayOfWebPageData={arrayOfWebPageData} />
                </> /*</React.Fragment>*/
            )
        }
    }

    //--------------------------------------------------------------------------------------------------

    //------------------HOOK------------------------
    const useJsonStorageConversion = (key) => { // use...()
        const [value, setValue] = React.useState(() => { // must be declared
            const stored = localStorage.getItem(key);
            if (!stored) return null;
            const parsed = JSON.parse(stored);
            return new User(parsed?.firstName, parsed?.lastName);
        });
        React.useEffect(() => {
            localStorage.setItem('user', JSON.stringify(value));
        }, [value])

        return [value, setValue]; // must be returned as array to be called a custom hook
    }
    //------------------HOOK------------------------

    const [user, setUser] = useJsonStorageConversion('user');

    let handleUserCreation = (newUser) => {
        setUser(newUser);
    }

    let isUserInit = (user) => {
        if (!user) {
            return <CreateUser onUserCreation={handleUserCreation} />
        }
    }

    const soughtList = arrayOfWebPageData.filter(value => value.title.toLowerCase().includes(searchTerm));

    //------------------------------------------------------------------------

    const [toggleValue, setToggleValue] = React.useState(() => {
        return true
    }, [])

    const clearStorage = () => {
        localStorage.clear();
        console.log("internal storage cleared.")
    }
    const handle = {
        false() { console.log("false") },
        true() { clearStorage() }
    };
    const handleButton = () => {
        setToggleValue(!toggleValue);
    }


    return (
        <div>
            {
                isUserInit(user)
            }
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}, {user?.fullName}!</h1>

            <InputWithLabel id="search" searchTerm={searchTerm} isFocused onInputChange={handleSearch} >
                <strong>Search:</strong>{/* <-- children */}
            </InputWithLabel>
            {
                displayLookingForTextAndResults(searchTerm)
            }
            <InputWithLabel id="search2" searchTerm={searchTerm} isFocused onInputChange={handleSearch} >
                <strong>Search:</strong>{/* <-- children */}
            </InputWithLabel>
            {
                displayLookingForTextAndResults(searchTerm)
            }
            <InputWithLabel id="search3" searchTerm={searchTerm} isFocused onInputChange={handleSearch} >
                <strong>Search:</strong>{/* <-- children */}
            </InputWithLabel>
            {
                displayLookingForTextAndResults(searchTerm)
            }
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <p1>RESET_DATA:
                <button onClick={handleButton}>AAH</button>
                <p1> GET THIS MAN A {<button onClick={handle[toggleValue.toString()]}>{toggleValue.toString().toUpperCase()}</button>} </p1>
            </p1>
            {/*i know this looks atrocious
            but its also so cool at the same time
            RESETS data when the button is set to true
            */}
            <PageList arrayOfWebPageData={soughtList} />
        </div>

    )
}

export default App
