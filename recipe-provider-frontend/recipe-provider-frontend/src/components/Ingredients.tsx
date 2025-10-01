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

  return (
    <div className="flex space-x-5 flex-wrap mb-5">
      {ingredients &&
        ingredients.map((ingredient) => (
          <IngredientCard name={ingredient.name} amount={ingredient.amount} />
        ))}
    </div>
  );
}

export default AllIngredients;
