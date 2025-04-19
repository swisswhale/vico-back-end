import Collection from '../models/Collection.js';

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user.userId });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, user: req.user.userId });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = new Collection({
      name,
      description,
      user: req.user.userId // ✅ inject from decoded token
    });

    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const collection = await Collection.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { name, description },
      { new: true }
    );
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(collection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addArtworkToCollection = async (req, res) => {
  try {
    const { id, artworkId } = req.params;
    const collection = await Collection.findOne({ _id: id, user: req.user.userId });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (!collection.artworks.includes(artworkId)) {
      collection.artworks.push(artworkId);
      await collection.save();
    }
    res.json(collection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeArtworkFromCollection = async (req, res) => {
  try {
    const { id, artworkId } = req.params;
    const collection = await Collection.findOne({ _id: id, user: req.user.userId });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    collection.artworks = collection.artworks.filter(
      (art) => art.toString() !== artworkId
    );
    await collection.save();
    res.json(collection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};