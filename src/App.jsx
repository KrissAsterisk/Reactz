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

const DeleteItemFromListWithButton = ({ delistedItems, handleWebData, setDelistedItems }) => {

    const handleDeleteButton = (valueToDelete) => {
        handleWebData(valueToDelete, setDelistedItems, );
    };

    return (

        delistedItems.map((value) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>{value}<button onClick={() => handleDeleteButton(value)}>DELETE</button></div>
        ))

    );
}
const PageListItem = ({ itemOfWebPageData, handleWebData }) => {

    const [delistedItems, setDelistedItems] = React.useState([]);
    React.useEffect(() => {
        let formattedWebData = [];
        for (let key in itemOfWebPageData) {
            switch (key) {
                case "url": {
                    var titleToUrl = <a key={itemOfWebPageData.objectId} href={`http://${itemOfWebPageData[key]}`}>{itemOfWebPageData.title}:</a>;
                    formattedWebData.push(titleToUrl);
                    break;
                }
                case "authors": {

                    formattedWebData.push(<div><li key={key}>{`${key}: ${itemOfWebPageData[key]} \n`}</li></div>)
                    break;
                }
                case "objectId": break;
                case "title": break;
                default: formattedWebData.push(<div><li key={key}>{`${key}: ${itemOfWebPageData[key]} \n`}</li></div>)
            }

        }
        setDelistedItems(formattedWebData);
    }, [])

    return <DeleteItemFromListWithButton delistedItems={delistedItems} handleWebData={handleWebData} setDelistedItems={setDelistedItems} />

}

//-----------------------------------------------------------------------------------------------

const PageList = ({ arrayOfWebPageData, handleWebData }) => {
    return (
        <>
            {
                arrayOfWebPageData.map((itemOfWebPageData) => <PageListItem key={itemOfWebPageData.objectId} itemOfWebPageData={itemOfWebPageData} handleWebData={handleWebData} />)
            }
        </>
    )
}

//-----------------------------------------------------------------------------------------------

const ValidateSearch = ({ soughtList }) => {
    return (
        <>
            {soughtList.map((item, index) => (
                <li key={index}>
                    {`${item.title} - ${item._displayField}: ${item[item._displayField]}`}
                </li>
            ))}
        </>
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

    //----------------------------------STATIC_LOCAL_DATA--------------------------------------
    const initialArrayOfWebPageData = [
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

    const [arrayOfWebPageData, setArrayOfWebPageData] = React.useState([]);

    //----------------------------------ASYNC_PROMISE-----------------------------------------
    const getAsyncData = () => {
        return new Promise((resolve =>
            setTimeout(
                () => resolve({ data: { arrayOfWebPageData: initialArrayOfWebPageData } }),
                1000
            )
        ));
    }


    React.useEffect(() => {
        getAsyncData().then(result => {
            setArrayOfWebPageData(result.data.arrayOfWebPageData);
        });
    }, []);

const handleWebData = (valueToDelete, setDelistedItems) => {
    setDelistedItems(prev => prev.filter(item => item !== valueToDelete));

    if (String(valueToDelete.key) === String(valueToDelete.key * 1)) {
        // it's a number-like key = objectId = title row, remove whole entry
        setArrayOfWebPageData(prev =>
            prev.filter(item => String(item.objectId) !== String(valueToDelete.key))
        );
    } else {
        // it's a field key like "authors", "num_comments" etc, remove that field from the item
        setArrayOfWebPageData(prev =>
            prev.map(item => {
                const updated = { ...item };
                delete updated[valueToDelete.key];
                return updated;
            })
        );
    }
}

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
        if (searchTerm.includes(':')) {
            return (
                <>
                    <p>Looking for: {searchTerm}</p>
                    <ValidateSearch soughtList={validateList} />
                </>
            )
        }
    }

    const soughtList = React.useMemo(() => {
        if (searchTerm.includes(':')) {
            const [titlePart, fieldPart] = searchTerm.split(':').map(s => s.trim());
            return arrayOfWebPageData
                .filter(value => value.title.toLowerCase().includes(titlePart));
        }
        return arrayOfWebPageData.filter(value => value.title.toLowerCase().includes(searchTerm));
    }, [arrayOfWebPageData, searchTerm]);

    const validateList = React.useMemo(() => {
        if (!searchTerm.includes(':')) return [];
        const [titlePart, fieldPart] = searchTerm.split(':').map(s => s.trim());
        return arrayOfWebPageData
            .filter(value => value.title.toLowerCase().includes(titlePart))
            .map(value => ({ ...value, _displayField: fieldPart }));
    }, [arrayOfWebPageData, searchTerm]);

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
                {
                    jsArray.map((item) => item.replace(item.charAt(item.length - 1), "X"))
                }
                --
            </h1>
            <LocalStorageReset useStorageState={useStorageState}>
                RESET_DATA:
            </LocalStorageReset>
            <PageList arrayOfWebPageData={soughtList} handleWebData={handleWebData} />
        </div>

    )
}


export default App
