> Book rental API is an API that allow the users to read books and genre information data from database. Book rental API also allow admin users to create, update and delete a book and  while it allows members to get genre and book information and also rent books from database.

> There're some features included in the API which allow users to programmatically sort the books (based on released date, title, availability or genre), rent or returning a book, search a book and fetch a certain number of books from database.

> This documentation outlines the rent book API functionality.


### 🏠 [API Documentation](https://documenter.getpostman.com/view/15213147/2s83zdwS72)


## Install
To install clone the repo on your local machine then in the root directory run

```sh
npm install
```

## Documentation
- Postman Documentation can be found here: https://documenter.getpostman.com/view/15213147/2s83zdwS72

## Technologies Used
- Node
- Express
- Typescript
- Mongoose
- Zod
## Usage

> To get this project running pefectly on your local, ensure you follow the instructions below.

1. Create a .env file in the root directory.
2. In the .env file ensure you have the following setup. (An example has been provided in the .env.example file)

```
PORT=3000
saltWorkFactor=10
DBURI=mongodb://localhost:27017/rest-api-tut
TOKEN_SECRET=
```

3. Run the npm command below

```sh
npm run dev
```

4. Refer to the docs located at https://documenter.getpostman.com/view/15213147/2s83zdwS72


## Author

👤 **Onasanya Tunde**

- Website: https://onasanyatunde.vercel.app
- Twitter: [@simply_rammy](https://twitter.com/simply_rammy)
- Github: [@rammyblog](https://github.com/rammyblog)
- LinkedIn: [@onasanya-tunde](https://linkedin.com/in/onasanya-tunde)
