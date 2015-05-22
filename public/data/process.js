import fs from 'fs';

import d1 from './fashion.json';
import d2 from './digital.json';
import d3 from './ideas.json'; 

const result = [].concat(
  d1.map((d) => {
    return {
      name: d.name,
      image: d.image,
      url: d.url,
      description: `${d.class2}: ${d.description}`,
      source: 'fashion',
    };
  }),
  d2.map((d) => {
    return {
      name: d.category,
      image: d.imgsrc,
      url: d.url,
      description: d.description,
      source: 'digital',
    };
  }),
  d3.map((d) => {
    return {
      name: d.name,
      image: d.img,
      url: d.url,
      description: d.content,
      source: 'ideas',
    };
  })
);

fs.writeFile('data.json', JSON.stringify(result), () => {
  console.log('Done ;)');
});
