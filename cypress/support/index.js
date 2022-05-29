beforeEach(function () {
  Object.assign(this, {
    response: null,
    requestBody: null,
    setResponse(object) {
      this.response = object;
    },
    setRequestBody(object) {
      this.requestBody = object;
    },
  });
});
