from fastmcp import FastMCP

mcp = FastMCP(name="MyServer")

# @mcp.tool
# def get_recipes(ingredients: list[Ingredient], dietary_restriction: str, request: str) -> list[str]:
#     ### gets recipes according to the ingredients, dietary_restrictions, and requests given by the user
#     recipes: list[str] = []
#     return recipes

if __name__ == "__main__":
    # This runs the server, defaulting to STDIO transport
    mcp.run()

    #To use a different transport, e.g., HTTP:
    # mcp.run(transport="http", host="127.0.0.1", port=9000)