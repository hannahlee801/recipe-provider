import Header from "./components/Header";
import AllIngredients from "./components/Ingredients";
import RecipeRequestForm from "./components/RecipeRequestForm";
import "./index.css";

function App() {
  return (
    <div className="text-white  font-alegreya">
      <Header />
      <div className="text-center mt-20 mb-15 mr-15 ml-15 font-bold text-5xl">
        <h1 className="">What will you make today?</h1>
      </div>
      <div className="mr-9 ml-9 mt-5">
        <AllIngredients />
      </div>
      <div className="flex flex-col items-center mt-15 text-lg">
        <h1>
          Do you have any dietary restrictions or specific requests (i.e. a
          specific cuisine, high protein, 30 minute recipes)?
        </h1>
        <h1 className="mb-5">
          Fill out the form below and click submit to get some recipes!
        </h1>
        <div className="mb-20">
          <RecipeRequestForm />
        </div>
      </div>
    </div>
  );
}

export default App;
