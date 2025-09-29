import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

type NewIngredientFormData = {
  name: string;
  amount: string;
};

const AddIngredientForm: React.FC = () => {
  const [newIngredientFormData, setNewIngredientFormData] =
    useState<NewIngredientFormData>({
      name: "",
      amount: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewIngredientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:8010/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newIngredientFormData),
      mode: "cors",
    });

    setNewIngredientFormData({
      name: "",
      amount: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-60">
          <div>
            <Input
              id="name"
              name="name"
              placeholder="Item Name"
              autoComplete="name"
              value={newIngredientFormData.name}
              onChange={handleChange}
              className="mb-3 border-2 border-tigerseye-100 mt-5"
            />
          </div>
          <div>
            <Input
              id="amount"
              name="amount"
              placeholder="Amount"
              autoComplete="amount"
              value={newIngredientFormData.amount}
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

export default AddIngredientForm;
