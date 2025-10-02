import { Button } from "./ui/button";

type IngredientCardInfo = {
  key: string;
  name: string;
  amount: string;
  handleIngredientDelete: (name: string) => void;
};

const IngredientCard: React.FC<IngredientCardInfo> = ({
  name,
  amount,
  handleIngredientDelete,
}) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/ingredients/${encodeURIComponent(name)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error: any) {
      console.error(error.message);
    }

    handleIngredientDelete(name);
  };

  return (
    <div className="bg-deepblue-100 text-white text-center text-wrap w-52 h-24 mb-5 flex flex-col justify-center rounded-xl">
      <div className="flex justify-end">
        <span>
          <Button
            type="submit"
            className="w-3 h-5 bg-transparent"
            onClick={handleDelete}
          >
            x
          </Button>
        </span>
      </div>
      <div className="flex flex-col justify-center mb-3">
        <h1 className="text-xl">{name}</h1>
        <h3 className="text-sm">{amount}</h3>
      </div>
    </div>
  );
};

export default IngredientCard;
