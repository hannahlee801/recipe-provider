from sqlmodel import Field, Relationship, SQLModel

# class User(SQLModel, table=True):
#     username: str
#     email: str
#     hashed_password: str
#     token: str | None = None
#     ingredients: list["Ingredient"] = Relationship(back_populates="", link_model = )

class Ingredient(SQLModel, table=True):
    name: str = Field(primary_key=True)
    amount: str


# class Recipe(SQLModel, table=True):
#     name: str
#     ingredients: list[Ingredient]
#     directions: list[str]