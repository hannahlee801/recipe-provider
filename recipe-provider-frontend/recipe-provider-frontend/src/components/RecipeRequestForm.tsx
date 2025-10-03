import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

type RecipeRequestFormData = {
  dietary_restriction: string;
  request: string;
};

type RecipeResponse = {
  recipe: string;
};

const RecipeRequestForm: React.FC = () => {
  const [newRecipeFormData, setNewRecipeFormData] =
    useState<RecipeRequestFormData>({
      dietary_restriction: "",
      request: "",
    });

  const [recipeResponse, setRecipeResponse] = useState<RecipeResponse | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewRecipeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8000/recipes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipeFormData),
          mode: "cors",
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data: RecipeResponse = await response.json();
        setRecipeResponse(data);

        setNewRecipeFormData({
          dietary_restriction: "",
          request: "",
        });
      } catch (error: any) {
        console.error("Error fetching routine", error);
      }
    };
    fetchRecipe();
  };

  return (
    <div className="ml-25 mr-25">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col w-60">
          <div>
            <Input
              id="dietary_restriction"
              name="dietary_restriction"
              placeholder="Dietary Restrictions"
              autoComplete="dietary_restriction"
              value={newRecipeFormData.dietary_restriction}
              onChange={handleChange}
              className="mb-3 border-2 border-tigerseye-100"
            />
          </div>
          <div>
            <Input
              id="request"
              name="request"
              placeholder="Cuisine Requests"
              autoComplete="request"
              value={newRecipeFormData.request}
              onChange={handleChange}
              className="mb-5 border-2 border-tigerseye-100"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-20 bg-golden-100 mb-10 hover:bg-tigerseye-100"
          >
            Submit
          </Button>
        </div>
      </form>
      <div className="">
        <h1 className="text-left text-3xl mb-5">Recipes:</h1>
        <h2 className="bg-deepblue-100 text-white pl-10 pr-10 pt-10 pb-10 rounded-2xl drop-shadow-xl drop-shadow-black border-2 border-tigerseye-100">
          {recipeResponse?.recipe}
        </h2>
      </div>
    </div>
  );
};

export default RecipeRequestForm;
