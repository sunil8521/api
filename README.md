
# Blog API

This is a basic API for managing a blog's content. It is built using Node.js, Express.js, and MongoDB with Mongoose for data storage. The API allows you to create, read, update, and delete blog posts.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- MongoDB
- npm (Node Package Manager)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
1. **Install dependencies:**

   ```bash
   npm install
1. **Start the server:**

   ```bash
   npm start
## Endpoints
- `GET /`: A simple welcome message.
- `GET /getall`: Get a list of all blog posts.
- `GET /getall/:id`: Get a specific blog post by ID.
- `POST /posts`: Create a new blog post.
- `PATCH /posts/:id`: Update an existing blog post by ID.
- `DELETE /posts/:id`: Delete a blog post by ID.
## Data Model

- `displayId`: A unique identifier for each blog post.
- `title`: The title of the blog post.
- `content`: The content of the blog post.
- `author`: The author of the blog post.
- `date`: The date when the blog post was created.

## Usage

You can interact with this API using HTTP requests or integrate it into your applications for managing blog content.
