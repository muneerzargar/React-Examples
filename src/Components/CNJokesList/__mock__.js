module.exports = {
  get: jest.fn(() => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          joke: "hello"
        },
        {
          id: 2,
          joke: "foo"
        },
        {
          id: 3,
          joke: "baz"
        }
      ]
    });
  })
};
