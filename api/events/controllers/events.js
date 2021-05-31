'use strict';
const { default: createStrapi } = require('strapi');
const { sanitizeEntity } =require('strapi-utils')

// const { default: createStrapi } = require("strapi");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if(!user) {
      return ctx.badRequest(null, [
        { message: [{ id: "No authorization header has been called."}]}
      ]);
    }

    const data = await createStrapi.services.events.find({user: user.id})

    if(!data) {
      return ctx.notFound()
    }

    return sanitizeEntity(data, {model: createStrapi.models.events})
  }
};
