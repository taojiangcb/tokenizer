function *arrayToGenerator(arr) {
  for(let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

export default arrayToGenerator;