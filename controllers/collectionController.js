import Collection from '../models/Collection.js';

export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCollection = async (req, res) => {
  const { name, description } = req.body;
  const collection = new Collection({
    name,
    description,
    user: req.user._id
  });

  try {
    const newCollection = await collection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addArtworkToCollection = async (req, res) => {
  try {
    const { collectionId, artworkId } = req.params;
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
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