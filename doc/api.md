# API 文档

## 目录
- [类型相关接口](#类型相关接口)
- [评论相关接口](#评论相关接口)
- [电影相关接口](#电影相关接口)

---

## 类型相关接口

### 获取所有类型
- **URL**: `/genre/list`
- **Method**: `GET`
- **请求参数**: 无
- **返回示例**:
```json
[
  { "name": "动作" },
  { "name": "喜剧" }
]
```
- **返回结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| name | String | 类型名称 |

### 按名称搜索类型
- **URL**: `/genre/{name}`
- **Method**: `GET`
- **路径参数**:
  - `name` (String): 类型名称
- **返回结构**: 同上

---

## 评论相关接口

### 获取某电影所有评论
- **URL**: `/comment/{id}`
- **Method**: `GET`
- **路径参数**:
  - `id` (int): 电影ID
- **返回结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | Integer | 评论ID |
| movieId | String | 电影ID |
| userName | String | 用户名 |
| text | String | 评论内容 |

### 新增评论
- **URL**: `/comment`
- **Method**: `PUT`
- **请求体**:
```json
{
  "movieId": "1",
  "userName": "张三",
  "text": "很好看！"
}
```
- **请求体结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| movieId | String | 电影ID |
| userName | String | 用户名 |
| text | String | 评论内容 |
- **返回结构**: 操作结果

---

## 电影相关接口

### 分页获取电影
- **URL**: `/movie/page`
- **Method**: `POST`
- **请求体**:
```json
{
  "id": 0,
  "page": 1,
  "pageSize": 10,
  "mainType": "电影",
  "genreName": "动作",
  "startYear": 2000,
  "endYear": 2024
}
```
- **请求体结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | int | 电影ID（可选） |
| page | int | 页码 |
| pageSize | int | 每页数量 |
| mainType | String | 主类型（如电影/番剧） |
| genreName | String | 类型名称 |
| startYear | int | 起始年份 |
| endYear | int | 结束年份 |
- **返回结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| totalPage | long | 总页数 |
| movies | List<MovieVo> | 电影列表 |

#### MovieVo 结构
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | Integer | 电影ID |
| title | String | 电影名 |
| year | Integer | 年份 |
| cover | String | 封面URL |
| mainType | String | 主类型 |
| type | Integer | 类型编号 |
| genres | List<String> | 类型列表 |

### 获取电影Top10
- **URL**: `/movie/top10`
- **Method**: `GET`
- **返回结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| id | int | 电影ID |
| title | String | 电影名 |
| popularity | int | 热度 |

### 新增电影
- **URL**: `/movie`
- **Method**: `PUT`
- **请求体**:
```json
{
  "title": "电影名",
  "year": 2024,
  "cover": "url",
  "description": "简介",
  "type": "电影",
  "genres": ["动作", "喜剧"]
}
```
- **请求体结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| title | String | 电影名 |
| year | Integer | 年份 |
| cover | String | 封面URL |
| description | String | 简介 |
| type | String | 类型 |
| genres | List<String> | 类型列表 |
- **返回结构**: 操作结果

### 获取电影详情
- **URL**: `/movie/{id}`
- **Method**: `GET`
- **路径参数**:
  - `id` (int): 电影ID
- **返回结构**:
| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| title | String | 电影名 |
| year | Integer | 年份 |
| cover | String | 封面URL |
| mainType | String | 主类型 |
| type | Integer | 类型编号 |
| genres | List<String> | 类型列表 |
| description | String | 简介 |
| popularity | Integer | 热度 | 