"use client";

import Book from "./components/Book";
import Dropdown from "./components/Dropdown";
import ListBox from "./components/ListBox";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="">
                <Book />
                {/* <Dropdown /> */}
                <ListBox />
            </main>
        </div>
    );
}
