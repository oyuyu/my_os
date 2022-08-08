function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

read('./src/index')
  .then((data) => {
    console.log('data为resolve的内容:', data)
  })
  .then(() => {})
  .catch((err) => {
    console.log(err)
  })
