const PropertyAdSch = require("../schema/propertyAd");

const getPropertyAds = async (req, res) => {
  try {
    const propertyAds = await PropertyAdSch.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      title: "Data Found",
      body: propertyAds,
    });
  } catch (err) {
    return res.status(500).json({
      title: "Error",
      message: err.message,
    });
  }
};

const addPropertyAd = async (req, res) => {
  try {
    const newPropertyAd = new PropertyAdSch({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      adsType: req.body.adsType,
      placeId: req.body.placeId,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      sizeSqm: req.body.sizeSqm,
      area: req.body.area,
      amenities: req.body.amenities || [],
    });

    const savedPropertyAd = await newPropertyAd.save();

    return res.status(201).json({
      title: "Successfully Created",
      body: savedPropertyAd,
    });
  } catch (err) {
    return res.status(500).json({
      title: "Error",
      message: err.message,
    });
  }
};

const updatePropertyAd = async (req, res) => {
  try {
    const updatedPropertyAd = await PropertyAdSch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedPropertyAd) {
      return res.status(404).json({
        title: "Not Found",
        message: "Invalid ID",
      });
    }

    return res.status(200).json({
      title: "Updated Successfully",
      body: updatedPropertyAd,
    });
  } catch (err) {
    return res.status(500).json({
      title: "Error",
      message: err.message,
    });
  }
};

const deletePropertyAd = async (req, res) => {
  try {
    const deletedPropertyAd = await PropertyAdSch.findByIdAndDelete(req.params.id);

    if (!deletedPropertyAd) {
      return res.status(404).json({
        title: "Not Found",
        message: "Invalid ID",
      });
    }

    return res.status(200).json({
      title: "Successfully Deleted",
    });
  } catch (err) {
    return res.status(500).json({
      title: "Error",
      message: err.message,
    });
  }
};

module.exports = {
  getPropertyAds,
  addPropertyAd,
  updatePropertyAd,
  deletePropertyAd,
  
};
