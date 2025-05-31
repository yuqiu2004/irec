import json

# 假设 mock 数据已经存储在 mockMovies.json 文件中
with open("mockData.json", "r", encoding="utf-8") as f:
    movies = json.load(f)

sql_lines = []
sql_lines.append("INSERT INTO movies (id, title, genre, year, cover, description, type, popularity) VALUES")

for i, movie in enumerate(movies):
    id = movie["id"]
    title = movie["title"].replace("'", "''")
    genre = json.dumps(movie["genre"], ensure_ascii=False)
    year = movie["year"]
    cover = movie["cover"]
    description = movie["description"].replace("'", "''")
    type = movie["type"]
    popularity = movie["popularity"]

    sql = f"('{id}', '{title}', '{genre}', '{year}', '{cover}', '{description}', '{type}', {popularity})"
    if i < len(movies) - 1:
        sql += ","
    else:
        sql += ";"
    sql_lines.append(sql)

# 输出到文件
with open("mock_movies.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print("✅ SQL 文件已生成：mock_movies.sql")
