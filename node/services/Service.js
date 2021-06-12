class Service {
  static rejectResponse(error, code = 500) {
    return { error, code };
  }

  static successResponse(payload, code = 200) {
    return { payload, code };
  }
  
  static redirectResponse(url, code = 302) {
    return { url, code };
  }
}

module.exports = Service;
