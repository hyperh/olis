import {SearchSource} from 'meteor/meteorhacks:search-source';

const options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
const fields = [ 'name', 'emails' ];

export default new SearchSource('allUsers', fields, options);
