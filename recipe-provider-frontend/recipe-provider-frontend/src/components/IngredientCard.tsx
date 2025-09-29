type IngredientCardInfo = {
  name: string;
  amount: string;
};

const IngredientCard: React.FC<IngredientCardInfo> = ({ name, amount }) => {
  return (
    <div className="bg-deepblue-100 text-white text-center text-wrap w-52 h-20 mb-5 flex justify-center rounded-xl">
      <div className="flex flex-col justify-center">
        <h1 className="text-xl">{name}</h1>
        <h3 className="text-sm">{amount}</h3>
      </div>
    </div>
  );
};

export default IngredientCard;
