import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { GithubProvider } from "./context/github/GithubContext";
const Home = lazy(() => import("./pages/Home.js"));
const About = lazy(() => import("./pages/About.js"));
const NotFound = lazy(() => import("./pages/NotFound.js"));

// Switch -> Routes Componnet-> element

// TO SEARCH USER https://api.github.com/search/users?q=Raghavmunjal
// TO GET All USERS https://api.github.com/users
// TO GET PARTICULAR USER https://api.github.com/users/Raghavmunjal

const App = () => {
  return (
    <GithubProvider>
      <Router>
        <Suspense fallback={<h1>Github_Finder</h1>}>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/not-found" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Suspense>
      </Router>
    </GithubProvider>
  );
};

export default App;
