// Job : When the user goes to this URL, show this page

import { BrowserRouter, Routes, Route } from "react-router-dom";
// These 3 tools work together to handle page navigation.

import Home from "./pages/Home";


export default function App(){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            </Routes>
            </BrowserRouter>
    )
}

//BrowserRouter- Wraps your whole app and enables routing. Think of it as turning on the GPS for your app.
//Routes- A container that holds all your routes. It looks at the current URL and finds the matching route.
//path="/" — when the URL is just / (your homepage). element={<Home />} — show the Home component (where it should be)