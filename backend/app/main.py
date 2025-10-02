from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
# from app.routers import ai, auth
from sqlmodel import Session, select
from fastapi_mcp import FastApiMCP

from .database import get_db
from .models import Ingredient
from .schemas import CreateRecipeRequest, CreateIngredientRequest
import ollama

app = FastAPI(title="Recipe Provider")
# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(ai.router, prefix="/ai", tags=["ai"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ingredients", operation_id="get_ingredients")
async def get_ingredients(db: Session = Depends(get_db)) -> list[Ingredient]:
    return db.exec(select(Ingredient)).all()

@app.post("/ingredients", status_code=status.HTTP_201_CREATED, operation_id="create_ingredient")
async def create_ingredient(new_ingredient: CreateIngredientRequest, db: Session = Depends(get_db)) -> None:
    ingredient: Ingredient = Ingredient(**new_ingredient.model_dump())
    db.add(ingredient)
    db.commit()

@app.post("/recipes", operation_id="generate_recipe")
async def generate_recipes(create_recipe_request: CreateRecipeRequest, db: Session = Depends(get_db)) -> dict[str, str]:
    ingredients: list[Ingredient] = db.exec(select(Ingredient)).all()
    prompt: str = f'Create three recipes using the current ingredient list {ingredients} and accommodating any dietary restrictions {create_recipe_request.dietary_restriction} and cuisine requests {create_recipe_request.request}'
    try:
        response = ollama.generate(model= "llama3", prompt=prompt)
        return {"response": response['response']}
    except Exception as e:
        return {"error": str(e)}

@app.delete("/ingredients/{ingredient_name}", status_code=status.HTTP_204_NO_CONTENT, operation_id="delete_ingredient")
async def delete_ingredient(ingredient_name: str, db: Session = Depends(get_db)) -> None:
    ingredient: Ingredient | None = db.get(Ingredient, ingredient_name)
    if ingredient is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{ingredient_name} not found.")
    db.delete(ingredient)
    db.commit()

mcp = FastApiMCP(app, include_operations=["generate_recipe"])
mcp.mount()
