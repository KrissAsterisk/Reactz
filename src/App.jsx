import './App.css'

const title = {
    name: "Reactz",
    introduction: "Presents",
    body: "Welcome to my page!"
};



let jsArray = [`el1`, `el2`, `el3`];
let makeNoise = () => "AAAAAAAAAAAAAAAAH";
function App() {

    console.log(makeNoise());


    return (
        <div>
            <h1>{makeNoise()}</h1>
            <h1>{title.name} {title.introduction}:</h1>
            <h1>{title.body}</h1>
            <h1>
                {
                    jsArray.map((value) => value.replace(value.charAt(value.length-1), "X"))

                }
            </h1>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>z

    )
}

export default App
