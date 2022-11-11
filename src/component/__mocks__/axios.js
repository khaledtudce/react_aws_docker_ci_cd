const fakeAxios = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

export default fakeAxios;
