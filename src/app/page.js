"use client";

import Book from "./components/Book";
import Navbar from "./components/Navbar";
import ListBoxes from "./pages/ListBoxes";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="">
                <Book />
                <ListBoxes />
            </main>

        </div>
    );
}
