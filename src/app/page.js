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
                <div className="flex space-x-10">
                    <ListBox url="http://localhost:8080/getCities" placeholder="Select City"/>
                    <ListBox url="http://localhost:8080/getWorkshops" placeholder="Select Workshop" />
                </div>
            </main>
            
        </div>
    );
}
