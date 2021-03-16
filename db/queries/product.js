module.exports = {
  products: `
  CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    category VARCHAR NOT NULL, 
    size VARCHAR NOT NULL,
    owner_id UUID REFERENCES users(id),
    created_at TIMESTAMPTZ default now(),
    updated_at TIMESTAMPTZ default now()
  );
`,

  insertProduct: `
  INSERT INTO products (id, product_name, description, category, size, owner_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;
`,

  fetchProductById: `
  SELECT * FROM products WHERE id = $1;
  `,

  fetchAllProducts: `
  SELECT * FROM products;
  `,

  deleteProductById: `
  DELETE FROM products WHERE id = $1;
  `,

  updateProductDetailsById: `
  UPDATE products
  SET 
    product_name = $2,
    description = $3,
    category = $4,
    size = $5,
    updated_at=NOW()
  WHERE id = $1
  RETURNING *;
 `,

  rating: `
  CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    product_name VARCHAR NOT NULL,
    rater_id UUID NOT NULL,
    rating INT NOT NULL CHECK(rating < 11),
    user_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
    CONSTRAINT fk_product
      FOREIGN KEY(product_id)
        REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
    CONSTRAINT fk_users   
      FOREIGN KEY(user_id)
        REFERENCES users(id)
  );
  `,

  insertProductRating: `
   INSERT INTO ratings (
    product_id,
    product_name,
    rater_id,
    rating,
    user_id
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `,

  calculateAverageRating: `
    SELECT AVG(rating) AS average_rating
    FROM ratings
    WHERE product_id = $1;
  `,

  fetchUserRatings: `
  SELECT * FROM ratings WHERE user_id = $1 AND product_id = $2
  `,

  fetchAllRatingsForAProduct: `
    SELECT * 
    FROM ratings
    WHERE product_id = $1;
  `,

  fetchRatings: `
  SELECT * FROM ratings`,

  updateRatingsForAProduct: `
  UPDATE products
  SET average_rating = $2,
    updated_at = now()
  WHERE id = $1
  RETURNING *;
  `,

  updateProductDetails: `
  UPDATE products
  SET
    product_name = $2,
    description = $3,
    category = $4,
    size = $5,
    updated_at = now()
  where id = $1
  returning *;
  `,
};
