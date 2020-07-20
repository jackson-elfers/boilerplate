module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.login(data);
    return await this.method.services.user.login(data);
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.register(data);
    return await this.method.services.user.register(data);
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.readSingleId(data);
    return await this.method.services.user.readSingleId(data);
  }

  async emailExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.emailExists(data);
    return await this.method.services.user.emailExists(data);
  }

  async updateEmail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updateEmail(data);
    this.method.errors.user.updateEmail(data);
    await this.method.services.user.updateEmail(data);
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updatePassword(data);
    this.method.errors.user.updatePassword(data);
    await this.method.services.user.updatePassword(data);
  }

  async unregister(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.unregister(data);
    await this.method.services.user.unregister(data);
  }
};
