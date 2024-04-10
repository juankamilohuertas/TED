import { pool } from "../db.js";

export const renderHome = async (req, res) => {
  res.render("home");
};

export const renderPhoto = async (req, res) => {
  res.render("photo");
};

export const sendPhoto = async (req, res) => {
  const { imageURL } = req.body;

  const data = `SELECT id FROM customer`;
  const [rows] = await pool.query(data);

  const arrIdPhotos = rows.map((id) => id.id);
  const ultimateUserId = Math.max(...arrIdPhotos);

  if (rows.length > 0) {
    setTimeout(async () => {
      await pool.query(
        `UPDATE customer SET img = '${imageURL}' WHERE id = ${ultimateUserId}`
      );
    }, 500);
  }
};

export const renderCustomers = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM customer");
  res.render("customers", { customers: rows });
};

export const createCustomers = async (req, res) => {
  const newCustomer = req.body;
  await pool.query("INSERT INTO customer set ?", [newCustomer]);
  res.redirect("/panel");
};

export const editCustomer = async (req, res) => {
  const { id } = req.params;
  const [result] = await pool.query("SELECT * FROM customer WHERE id = ?", [
    id,
  ]);
  res.render("customers_edit", { customer: result[0] });
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  await pool.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id]);
  res.redirect("/panel");
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("DELETE FROM customer WHERE id = ?", [id]);
  if (result.affectedRows === 1) {
    res.json({ message: "Customer deleted" });
  }
  res.redirect("/panel");
};

export const signupCustomer = async (req, res) => {
  res.render("formSignUp");
};

export const signupValidate = async (req, res) => {
  try {
    let { usuario, nombre, password, password2, correo, telefono, terminos } =
      req.body;
    if (terminos != "on") {
      terminos = 0;
    } else {
      terminos = 1;
    }
    await pool.query(`INSERT INTO users (usuario, nombre, password, password2, correo,telefono, terminos)
    VALUES 
        ('${usuario}', '${nombre}', '${password}', '${password2}', '${correo}', '${telefono}', '${terminos}')`);

    res.render("signIn");
  } catch (error) {
    console.log(error);
  }
};

export const signInCustomer = (req, res) => {
  res.render("signIn", { message: "" });
};

export const validateSignIn = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query("SELECT correo, password FROM users");
  const emails = rows.map((user) => user.correo);
  const passwords = rows.map((user) => user.password);

  if (!emails.includes(email)) {
    res.render("signIn", { message: "Usuario no registrado" });
  } else if (!passwords.includes(password)) {
    res.render("signIn", { message: "Contraseña Invalida" });
  } else {
    res.redirect("/");
  }
};
