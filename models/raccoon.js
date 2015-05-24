var raccoon = require('raccoon');

// Recommendation system
raccoon.connect(6379, '127.0.0.1');

module.exports = {
  liked: function(userId, itemId, callback) {
    raccoon.liked(userId, itemId, callback ? callback : function(){});
  },

  recommendFor: raccoon.recommendFor,
};
