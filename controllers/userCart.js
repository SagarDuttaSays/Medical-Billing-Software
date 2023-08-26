const User = require("../models/user");
const Product = require("../models/product");
const Service = require("../models/service");
const Order = require("../models/order");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

exports.placeOrder = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid User Id");
  }
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(501).json({ message: "Invalid User ID" });
  }
  let total = 0.0;
  const bill = [];
  try {
    for (let [productID, quantity] of user.productCart) {
      if (quantity > 0) {
        let pa = 0.0;
        let pb = 0.0;
        let pc = 200;
        let priceAfterTax = 0.0;
        const objectId = new mongoose.Types.ObjectId(productID);
        const prod = await Product.findById(objectId);
        if (prod.price <= 5000) {
          pa = prod.price * 0.12;
          priceAfterTax = prod.price + pa + pc;
          total = total + priceAfterTax * quantity;
        } else {
          pb = prod.price * 0.18;
          priceAfterTax = prod.price + pb + pc;
          total = total + priceAfterTax * quantity;
        }

        bill.push({
          item: prod.name,
          quantity: quantity,
          "cost price": prod.price,
          "Tax PA": pa,
          "Tax PB": pb,
          "Tax PC": pc,
          "cost after tax": priceAfterTax,
          "total amount": priceAfterTax * quantity,
        });
      }
    }
    for (let [serviceID, quantity] of user.serviceCart) {
      if (quantity > 0) {
        let sa = 0.0;
        let sb = 0.0;
        let sc = 100.0;
        let priceAfterTax = 0.0;
        const objectId = new mongoose.Types.ObjectId(serviceID);
        const serv = await Service.findById(objectId);
        if (serv.price <= 8000) {
          sa = serv.price * 0.1;
          priceAfterTax = serv.price + sa + sc;
          total = total + priceAfterTax * quantity;
        } else {
          sb = serv.price * 0.15;
          priceAfterTax = serv.price + sb + sc;
          total = total + priceAfterTax * quantity;
        }
        bill.push({
          service: serv.name,
          quantity: quantity,
          "cost price": serv.price,
          "Tax SA": sa,
          "Tax SB": sb,
          "Tax SC": sc,
          "cost after tax": priceAfterTax,
          "total amount": priceAfterTax * quantity,
        });
      }
    }
  } catch (err) {
    return res.json({ message: err.message });
  }

  await Order.create({
    total: total,
    bill: bill,
    name: user.name,
    email: user.email,
    phone: user.phone,
    street: user.street,
    apartment: user.apartment,
    zip: user.zip,
    city: user.city,
    country: user.country,
  })
    .then((order) => {
      if (order) {
        const filter = { _id: user._id };
        const newValue = order._id;

        User.updateOne(filter, { $push: { orderIDs: newValue } })
          .then((result) => {
            const filter = { _id: user._id };
            const productCart = new Map();
            const serviceCart = new Map();
            const update = {
              $set: {
                productCart: productCart,
                serviceCart: serviceCart,
              },
            };

            // Use the updateOne() method to update the user's cart
            User.updateOne(filter, update)
              .then((result) => {
                console.log("Carts emptied true:", result);
              })
              .catch((error) => {
                console.error("Update error:", error);
              });
            console.log("inserted into orderid array:", result);
          })
          .catch((error) => {
            console.error("Update error:", error);
          });
        let alert = "Congratulations! You have successfully placed the order.";
        return res.status(200).send({ alert, order });
      } else {
        return res.json({ message: "Order could not be placed!" });
      }
    })
    .catch((err) => {
      return res.json({ message: err.message });
    });
};

exports.getOneCart = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(501).json({ message: "Invalid User ID" });
  }
  res.status(200).json({
    message: "Your cart is found",
    products: user.productCart,
    services: user.serviceCart,
  });
};

exports.checkOutCart = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.isValidObjectId(_id)) {
    return res.status(400).send("Invalid User Id");
  }

  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(501).json({ message: "Invalid User ID" });
  }
  let total = 0.0;
  const bill = [];
  try {
    for (let [productID, quantity] of user.productCart) {
      if (quantity > 0) {
        let pa = 0.0;
        let pb = 0.0;
        let pc = 200;
        let priceAfterTax = 0.0;
        const objectId = new mongoose.Types.ObjectId(productID);
        const prod = await Product.findById(objectId);
        if (prod.price <= 5000) {
          pa = prod.price * 0.12;
          priceAfterTax = prod.price + pa + pc;
          total = total + priceAfterTax * quantity;
        } else {
          pb = prod.price * 0.18;
          priceAfterTax = prod.price + pb + pc;
          total = total + priceAfterTax * quantity;
        }

        bill.push({
          item: prod.name,
          quantity: quantity,
          "cost price": prod.price,
          "Tax PA": pa,
          "Tax PB": pb,
          "Tax PC": pc,
          "cost after tax": priceAfterTax,
          "total amount": priceAfterTax * quantity,
        });
      }
    }
    for (let [serviceID, quantity] of user.serviceCart) {
      if (quantity > 0) {
        let sa = 0.0;
        let sb = 0.0;
        let sc = 100.0;
        let priceAfterTax = 0.0;
        const objectId = new mongoose.Types.ObjectId(serviceID);
        const serv = await Service.findById(objectId);
        if (serv.price <= 8000) {
          sa = serv.price * 0.1;
          priceAfterTax = serv.price + sa + sc;
          total = total + priceAfterTax * quantity;
        } else {
          sb = serv.price * 0.15;
          priceAfterTax = serv.price + sb + sc;
          total = total + priceAfterTax * quantity;
        }
        bill.push({
          service: serv.name,
          quantity: quantity,
          "cost price": serv.price,
          "Tax SA": sa,
          "Tax SB": sb,
          "Tax SC": sc,
          "cost after tax": priceAfterTax,
          "total amount": priceAfterTax * quantity,
        });
      }
    }
  } catch (err) {
    return res.json({ message: err.message });
  }
  console.log("final bill = ", bill);
  return res.status(200).send({ bill, total });
};

exports.updateOneCart = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(501).json({ message: "Invalid User ID" });
  }

  const { productCart } = req.body;
  const { serviceCart } = req.body;
  try {
    for (const productId in productCart) {
      user.productCart.set(productId, productCart[productId]);
    }
    for (const serviceId in serviceCart) {
      user.serviceCart.set(serviceId, serviceCart[serviceId]);
    }
    await user.save();
  } catch (err) {
    return res.json({ message: err.message });
  }

  res.status(200).send("User cart updated successfully");
};

exports.emptyOneCart = async (req, res) => {
  const _id = req.params.id;
  const user = await User.findOne({ _id });
  if (!user) {
    return res.status(501).json({ message: "Invalid User ID" });
  }
  try {
    user.productCart = new Map();
    user.serviceCart = new Map();

    // Save the updated user cart
    await user.save();

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
