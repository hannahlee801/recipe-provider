from pydantic import BaseModel
from app.models import Ingredient

# class CreateUserRequest(BaseModel):
#     name: str
#     email: str
#     username: str
#     password: str

# class Token(BaseModel):
#     pass

# class TokenData(BaseModel):
#     pass

class CreateIngredientRequest(BaseModel):
    name: str
    amount: str

class CreateRecipeRequest(BaseModel):
    dietary_restriction: str | None = None
    request: str | None = None

# class RecipeRequestResponse(BaseModel):
#     name: str
#     ingredients: list[Ingredient]
#     directions: list[str]