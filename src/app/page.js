"use client";

import FirstPage from "./pages/FirstPage";
import { store } from "./store";
import { Provider } from "react-redux";


export default function Home() {
    return (
        <Provider store={store}>
            <FirstPage />
        </Provider>
    );
}
