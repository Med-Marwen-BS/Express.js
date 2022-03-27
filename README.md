
# Project Title

Ds Node js




## Running Tests

To run tests, run the following command

```bash
  npm start
```



## API Reference

####  Signup

```http
  POST http://localhost:3000/api/users/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. user body


####  signin

```http
  POST http://localhost:3000/api/users/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. username + password

#### Reserver for an certification

```http
  POST http://localhost:3000/api/reservation/:certificationid
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. id of certification + date (body)
                        |  Authentification is needed


#### Get all certification

```http
  GET http://localhost:3000/api/certification
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Authentification |

#### Get certification by id

```http
  GET http://localhost:3000/api/certification/{id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of certification |

#### add certification

```http
  POST http://localhost:3000/api/certification
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Authentification + Admin


#### Get all disponible date for an certification

```http
  GET http://localhost:3000/api/certification/disponible/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. id of certification

#### Add an disponible date for an certification

```http
  PUT http://localhost:3000/api/certification/date/:id/:date
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. id of certification + date
            |          |  Authentification + Role Admin
