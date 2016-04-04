Connector/Node.js which implements the X DevAPI
=========================
The Node.js Connector is an asychronous promise-based client library for the
X DevAPI protocol that was introduced in MySQL 5.7.12.

MySQL 5.7 is an open-source relational database that is secure, high
performing, and easy to use. The X DevAPI supports relational tables and JSON 
documents making it possible to use both tables and collections at the same
time.

For general information about the X DevAPI, please refer to documentation on
http://dev.mysql.com/doc/x-devapi-userguide/en/

Requirements
------------
This library requires at least Node.js 4.2.

Installation
------------
This library is organized in a way that it can be installed using Node.js's npm
tool into your project:
  `npm install mysqlx-1.0.0.tgz`
Please refer to http://npmjs.com for more information on npm.

Getting Started
---------------
A simple JavaScript file using this library follows:


    var mysqlx = require('mysqlx');

    mysqlx.getSession({
        host: 'localhost',
        port: 33060,
        dbUser: 'root',
        dbPassword: ''
    }).then(function (session) {
        return session.createSchema("test_schema").then(function (schema) {
            return schema.createCollection("myCollection");
        }).then(function (collection) {
            return Promise.all([
                collection.add(
                    {baz: { foo: "bar"}},
                    {foo: { bar: "baz"}}
                ).execute(),
                collection.find("$.baz.foo == 'bar'").execute(function (row) {
                    console.log("Row: %j", row);
                }).then(function (res) {
                    console.log("Collection find done!");
                }),
                collection.remove("($.foo.bar) == 'baz'").execute().then(function () {
                    console.log("Document deleted");
                }),
                collection.drop()
            ]);
        }).then(function () {
            return session.dropSchema("test_schema");
        }).then(function () {
            return session.close();
        });
    }).catch(function (err) {
        console.log(err.stack);
        process.exit();
    });


License
-------
Copyright (c) 2015, 2016, Oracle and/or its affiliates. All rights reserved.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License as
published by the Free Software Foundation; version 2 of the
License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
02110-1301  USA

APPENDIX: Licenses for Third-Party Components
---------------------------------------------
### protobuf.js

Use of any of this software is governed by the terms of
the license below:

Copyright (c) Nathan LaFreniere <quitlahok@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


