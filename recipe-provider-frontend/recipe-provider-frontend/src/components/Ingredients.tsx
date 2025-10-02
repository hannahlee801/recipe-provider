import IngredientCard from "./IngredientCard";
import { useEffect, useState } from "react";

type IngredientResponse = {
  name: string;
  amount: string;
};

function AllIngredients() {
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost:8000/ingredients");
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data: IngredientResponse[] = await response.json();
        setIngredients(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchIngredients();
  }, []);

  const handleDelete = (name: string) => {
    const newIngredients = ingredients.filter(
      (ingredient) => ingredient.name !== name
    );
    setIngredients(newIngredients);
  };

  return (
    <div className="flex space-x-5 flex-wrap mb-5">
      {ingredients &&
        ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.name}
            name={ingredient.name}
            amount={ingredient.amount}
            handleIngredientDelete={handleDelete}
          />
        ))}
    </div>
  );
}

export default AllIngredients;
