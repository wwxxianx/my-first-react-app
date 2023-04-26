// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import product from '../schemas/product';
import category from '../schemas/category';
import newArrival from "../schemas/newArrival";
import topCategory from "../schemas/topCategory";
import featuredBrand from "../schemas/featuredBrand";
import mainBanner from './banner';
import user from './user';
import productReview from './productReview';


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
    // We name our schema
    name: "default",
    // Then proceed to concatenate our document type
    // to the ones provided by any plugins that are installed
    types: schemaTypes.concat([
        /* Your types here! */
        product,
        category,
        newArrival,
        topCategory,
        featuredBrand,
        mainBanner,
        user,
        productReview,
    ]),
});
