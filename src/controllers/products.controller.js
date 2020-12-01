import Product from "../models/Products";

export const createProduct = async (req, res) => {
  const {
    ancho,
    diametro,
    gramaje,
    peso,
    bobinanro,
    ofnro,
    turno,
    calidad,
    mtslineales,
    producttype,
  } = req.body;

  const newProduct = new Product({
    ancho,
    diametro,
    gramaje,
    peso,
    bobinanro,
    ofnro,
    turno,
    calidad,
    mtslineales,
    producttype,
  });
  
  try {
    console.log("nuevo prod:", newProduct)
    const productSaved = await newProduct.save();  
    res.status(201).json(productSaved);    

  } catch (error) {
    res.json(error)  
  }
  

};

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    console.log('id producto', req.params.productId)
    res.status(200).json(product)
};

/* export const updateProductById = async (req, res) => {
    try {
        const productoid = req.params.productId;
        console.log('primer cons', productoid);
        console.log('body', req.body);
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
              upsert: true, 
              new: true
        }).orFail();
        console.log('seg console', req.params.productId);
        await updatedProduct.save();  
        res.status(200).json(updatedProduct);
    } 
    catch (error) {
        console.log(error);
    }
    
}; */

export const updateProductById = async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true
  })
  console.log(req.params.productId)
  res.status(200).json(updatedProduct)
};



export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    console.log(productId)        
    const deletedProduct = await Product.findByIdAndDelete(productId);
    //await Product.save(productId);  
    res.status(204).json(deletedProduct);
  };
