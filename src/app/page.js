"use client";

import Book from "./components/Book";
import Navbar from "./components/Navbar";
import Radiobutton from "./components/Radiobutton";
import ListBoxes from "./pages/ListBoxes";
import { store } from "./store";
import { Provider } from "react-redux";

export default function Home() {
    return (
        <Provider store={store}>
            <Navbar />
            <main className="">
                <Book />
                <ListBoxes />
                <Radiobutton />
            </main>
        </Provider>
    );
}
