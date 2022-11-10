import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Main } from "../main/Main";

export function Layout(){
    return (
        <div className="layout">
            <Header/>
            <Main />
            <Footer />
        </div>
    );
}