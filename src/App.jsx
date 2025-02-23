import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Categories from "./pages/Categories/Categories";
import Contact from "./pages/Contact/Contact";
import Cart from "./pages/Cart/Cart";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route
                  path="/categories/:categoryName"
                  element={<Categories />}
                />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster position="top-right" />
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
