import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { motion } from 'framer-motion';

export default function PhotoGallery({ images }) {
  return (
    <Gallery>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Item
              original={image.url}
              thumbnail={image.thumbnail}
              width={image.width}
              height={image.height}
            >
              {({ ref, open }) => (
                <motion.img
                  ref={ref}
                  onClick={open}
                  src={image.thumbnail}
                  alt={image.alt}
                  className="cursor-pointer object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  whileHover={{ scale: 1.05 }}
                />
              )}
            </Item>
          </motion.div>
        ))}
      </div>
    </Gallery>
  );
}
