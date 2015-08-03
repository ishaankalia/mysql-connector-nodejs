"use strict";

var CollectionFind = require('./CollectionFind');
var CollectionAdd = require('./CollectionAdd');

function Collection(session, schema, collection) {
    this._session = session;
    this._schema = schema;
    this._collection = collection;
}

module.exports = Collection;

Collection.prototype.find = function (expr) {
    return new CollectionFind(this._session, this._schema, this._collection, expr);
};

Collection.prototype.add = function (document) {
    var documents = (arguments.length === 1 && Array.isArray(document)) ?
        document : Array.prototype.slice.call(arguments);

    return new CollectionAdd(this._session, this._schema, this._collection, documents);
};