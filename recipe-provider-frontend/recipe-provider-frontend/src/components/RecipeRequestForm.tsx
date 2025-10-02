import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

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

    fetch("http://localhost:8000/recipes", {
      method: "POST",
      body: JSON.stringify(newRecipeFormData),
      mode: "cors",
    });

    setNewRecipeFormData({
      dietary_restriction: "",
      request: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default RecipeRequestForm;
