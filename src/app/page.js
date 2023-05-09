import Book from "./components/Book";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="">
                <Book />
            </main>
        </div>
    );
}
