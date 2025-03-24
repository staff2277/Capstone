let data = [];

for (let index = 0; index < 36; index++) {
  data = [...data, { key: index, image: `/images/img/image-${index}.png` }];
}

export default data;
