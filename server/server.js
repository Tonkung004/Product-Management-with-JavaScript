const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 4000
const mongoose = require('mongoose')
const Resume = require('./models/resume');
const Product = require('./models/product');
const ProductType = require('./models/productType')
app.use(express.json());
app.use(cors());
mongoose.connect(
    'mongodb+srv://root:6514110018@cluster0.guv65ii.mongodb.net/ITMI1203?retryWrites=true&w=majority',
    { useNewUrlParser: true }
);

app.get('/getresume', async(req, res) => {
    const resume = await Resume.find();
    res.send(resume);
})

app.get('/getproducts', async(req, res) => {
    const product = await Product.find();
    res.json(product);
});

app.get('/getproduct/:id', async(req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);
});

const fs = require('fs')
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const fileType = file.originalname.split('.');
    cb(null, `${file.fieldname}-${Date.now()}.${fileType[fileType.length - 1]}`)
  }
})
const upload = multer({ storage: storage })
app.post('/product/create', upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log(file)
    const product = new Product(req.body);
    product.image = file.path;
    await product.save();
    res.json({
        message:"Save data success",
        statusCode: 200,
        data: product
    });
});

app.post('/product/update/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOneAndUpdate({_id: _id}, req.body);
    res.json({
        'status':'success' ,
        'data' : product
    });
});

app.post('/product/delete/:_id', async (req, res) => {
        const { _id } = req.params;
        try {
            // ดึงข้อมูลสินค้าที่ต้องการลบ
            const productToDelete = await Product.findOne({_id: _id});
            if (!productToDelete) {
                return res.status(404).json({
                    message: "Product not found",
                    statusCode: 404,
                });
            }
            // ทำการปรับปรุงข้อมูลสินค้า (เช่น ตั้งสถานะเป็น 'deleted' หรืออื่นๆ) ก่อนที่จะลบ
            const updatedProduct = await Product.findOneAndUpdate({_id: _id}, {status: 'deleted'}, {new: true});
            // ลบสินค้าที่ถูกปรับปรุงแล้ว
            await Product.deleteOne({_id: _id});
            res.json({
                message: "Delete data success",
                statusCode: 200,
                data: updatedProduct
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({

                message: "Internal server error",
                statusCode: 500,
            });
        }
});

app.get('/', (req, res) =>{
    res.send("Hello World");
});

app.post('/searchProducts', async (req, res) => {
    const product = await Product.find(req.body);
    res.json(product);
});

app.get("/getProductTypes", async (req, res) => {
    const productTypes = await ProductType.find();
    res.send(productTypes);
  });
  
  app.get("/getProductTypes/:id", async (req, res) => {
    const id = req.params.id;
    const productTypes = await ProductType.findById(id);
    res.json(productTypes);
  });
  
  app.post("/productType/create", async (req, res) => {
    const productTypes = new ProductType(req.body);
    await productTypes.save();
    res.json({
      message: "Save data success",
      statusCode: 200,
      data: productTypes,
    });
  });
  
  app.post("/productType/update/:_id", async (req, res) => {
    const { _id } = req.params;
    const productTypes = await ProductType.findOneAndUpdate({ _id: _id }, req.body);
    res.json({
      message: "Save data success",
      statusCode: 200,
      data: productTypes,
    });
  });
  
  app.delete("/productType/delete/:_id", async (req, res) => {
    const { _id } = req.params;
  await ProductType.findOneAndDelete({_id: _id});
  res.json({
    message: "Product deleted successfully",
    statusCode: 200,
  });
  });

app.listen(port, () => {
    console.log(`Application is running (Port ${port})`)
});