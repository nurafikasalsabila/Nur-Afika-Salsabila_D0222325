use tgs2

db.createCollection("Flowers")

db.flowers.insertOne({
    jenis: "Mawar",
    warna: "Merah",
    harga: 5000,
    stock: 100
})

db.flowers.find()

db.flowers.updateOne(
    {jenis: "Mawar"},
    {$set: {harga: 7000}}
)

db.flowers.deleteOne({jenis: "Mawar"})

db.flowers.bulkWrite([
    { insertOne: { document: { jenis: "Lily", warna: "White", harga: 8000, stock: 60 } } },
    { insertOne: { document: { jenis: "Orchid", warna: "Purple", harga: 15000, stock: 40 } } },
    { insertOne: { document: { jenis: "Sunflower", warna: "Yellow", harga: 5000, stock: 100 } } },
    { insertOne: { document: { jenis: "Carnation", warna: "Pink", harga: 7000, stock: 80 } } }
])

db.flowers.find({stock: {$lt: 80}})

db.flowers.find({
    $or: [{harga:{$gt: 7000}},{stock: {$eq:100}}]
})

db.createCollection("flower_validation", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["jenis", "warna", "harga", "stock"],
      properties: {
        jenis: {
          bsonType: "string",
          description: "Jenis bunga harus berupa string."
        },
        warna: {
          bsonType: "string",
          description: "Warna bunga harus berupa string."
        },
        harga: {
          bsonType: "int",
          minimum: 0,
          description: "Harga bunga harus berupa integer dan tidak boleh negatif."
        },
        stock: {
          bsonType: "int",
          minimum: 0,
          description: "Stok bunga harus berupa integer dan tidak boleh negatif."
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
})

db.flower_validation.insertOne({
  jenis: "Lily",
  warna: "White",
  harga: 8000,
  stock: 60
})

db.flower_validation.insertOne({
  jenis: "Lily",
  warna: "White",
  harga: 8000,
  stock: "lima puluh"
})


