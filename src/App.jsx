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

//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

const DeleteItemFromListWithButton = ({ items, setItems }) => {

    const handleDeleteButton = (value) => {
        setItems(prev => prev.filter(item => item !== value));
    };

    return (
        <>
            {items.map((value, index) => (
                <li key={index}>{value} <button onClick={() => handleDeleteButton(value)}>DELETE</button></li>
            ))}
        </>
    );
}
const PageListItem = ({ item }) => {

    let delistedItems = [];
    for (let key in item) {
        switch (key) {
            case "url": {
                var linkToUrl = <a key={item.objectId} href={`http://${item[key]}`}>{item.title || null}:</a>;
                delistedItems.push(linkToUrl);
                break;
            }
            case "authors": {

                delistedItems.push(<ul key={key}><li>{`${key}: ${item[key]} \n`}</li></ul>)
                break;
            }
            case "objectId": break;
            case "title": break;
            default: delistedItems.push(<ul key={key}><li>{`${key}: ${item[key]} \n`}</li></ul>)
        }
    }
    const [items, setItems] = React.useState(delistedItems);


    return <DeleteItemFromListWithButton items={items} setItems={setItems} />
}

//-----------------------------------------------------------------------------------------------

const PageList = ({ arrayOfWebPageData }) => {
    return (
        <ul>
            {
                arrayOfWebPageData.map((item) => <PageListItem key={item.objectId} item={item} />)

            }
        </ul>
    )
}

//-----------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------

const InputWithLabel = ({ id, searchTerm, isFocused, type = "text", onInputChange, children }) => {

    return (
        <React.Fragment>
            <label htmlFor={id}>{children}</label>
            &nbsp; {/* Non Breaking SPace - used for creating a space that prevents an automatic line break */}
            <input id={id} type={type} value={searchTerm} autoFocus={isFocused} onChange={onInputChange} /> {/*autoFocus -> {true} byDefault*/}
            {React.Children.forEach(children, (child, index) => {
                //console.log(child);
                // console.log(index);
            })}
        </React.Fragment>
    )
}

//-----------------------------------------------------------------------------------------------

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

    React.useEffect(() => {
        const persistantPrompt = (promptMsg) => {
            let userInput;
            do {
                userInput = normalizeInput(prompt(promptMsg));
            } while (invalidInputCondition(userInput))
            return userInput;
        }
        let createUser = () => {
            return new User(
                persistantPrompt("Please enter your nickname: "),
                persistantPrompt("Please enter your surname: ")
            );
        }
        let newUser;
        do newUser = createUser();
        while (!confirm(`nickname: ${newUser.firstName}\n` + `surname: ${newUser.lastName}\n` + `Are you sure?`) ||
            (newUser.firstName == undefined || newUser.lastName == undefined))
        onUserCreation(newUser);
    }, [onUserCreation]);

    return null;
}

//-----------------------------------------------------------------------------------------------

const LocalStorageReset = ({ children, useStorageState }) => {

    const [toggleValue, setToggleValue] = useStorageState('boolean', 'true');

    const clearStorage = () => {
        localStorage.clear();
        console.log("internal storage cleared.");
        window.location.reload();
    }

    const handleClear = {
        false() {
            console.log("false");
        },
        true() {
            clearStorage();
        }
    };
    const handleButton = () => {
        if (toggleValue === 'true') {
            setToggleValue('false');
        } else setToggleValue('true');
    }

    const displayButtonValue = () => {
        return (
            <>
                <button onClick={handleClear[toggleValue.toString()]} > {toggleValue.toString().toUpperCase()}</button>
            </>
        )
    }

    return (
        <>
            {children}
            &nbsp;
            <button onClick={handleButton}>AAH</button>
            <p1> GET THIS MAN A {displayButtonValue()} </p1>
        </>
    )
}

const App = () => {
    console.log(makeNoise());
    const arrayOfWebPageData = [
        {
            title: "Reactz",
            url: "localhost:9090",
            authors: ["me", "someone_else"],
            num_comments: 3,
            points: 4,
            perfection: 100,
            objectId: 0,
        },
        {
            title: "AuthServer",
            url: "authserver:9000",
            authors: ["admin"],
            num_comments: 0,
            points: 999,
            objectId: 1,
        },
        {
            title: "AnotherAddition",
            url: "0.0.0.0:0000",
            authors: ["TBD"],
            num_comments: null,
            points: null,
            objectId: 2

        },
        {
            title: "ANDANOTHER",
            url: "0.0.0.0:0000",
            authors: ["TBD"],
            num_comments: null,
            points: null,
            objectId: 3
        }
    ];

    //------------------CUSTOM_HOOKS------------------------
    //#1
    const useStorageState = (key, initialState) => {
        const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);

        React.useEffect(() => {
            localStorage.setItem(key, value);
        }, [value, key])

        return [value, setValue];
    }
    //#2
    const useJsonStorageConversion = (key, initialState = null) => {

        const [value, setValue] = React.useState(() => {
            const stored = localStorage.getItem(key);
            if (!stored) return initialState;
            const parsed = JSON.parse(stored);
            return typeof (parsed) == 'object' ? new User(parsed.firstName, parsed.lastName) : null;
        });
        React.useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value));
        }, [value, key])

        return [value, setValue];
    }
    //------------------CUSTOM_HOOKS\-----------------------------



    //                                      SEARCH HANDLER                  
    //--------------------------------------------------------------------------------------------------------
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

    const soughtList = arrayOfWebPageData.filter(value => value.title.toLowerCase().includes(searchTerm));

    /*                                   USER HANDLER
    --------------------------------------------------------------------------------------------------*/
    const [user, setUser] = useJsonStorageConversion('user');

    let handleUserCreation = (newUser) => {
        setUser(newUser);
    }

    let isUserInit = (user) => {
        if (!user) {
            return <CreateUser onUserCreation={handleUserCreation} />
        }
    }
    //                                   FINAL MAIN PAGE DISPLAY
    //--------------------------------------------------------------------------------------------------
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
            <h1>
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))

                }
            </h1>
            <LocalStorageReset useStorageState={useStorageState}>
                RESET_DATA:
            </LocalStorageReset>
            <PageList arrayOfWebPageData={soughtList} />
        </div>

    )
}


export default App
