export const statusManager = {
  _status: false,
  get status() {
    return this._status;
  },
  toggleStatus: function () {
    this._status = !this._status;
  },
};
