const { Model } = require('objection');
const guid = require('objection-guid')();

//Defines a Firefly user
class Transaction extends guid(Model) {

    //Table name
    static get tableName() {
        return 'transactions';
    }

    //ID column
    static get idColumn() {
        return 'id';
    }

    //Schema
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['value'],
            properties: {
                id: {type: 'guid'},
                value: {type: 'real'}
            }
        };
    }

    //Relations
    static get relationMappings() {
        const Account = require('./Account.js');
        return {
            transactionAccount: {
                relation: Model.BelongsToOneRelation,
                modelClass: Account,
                join: {
                    from: 'transactions.account',
                    to: 'accounts.id'
                }
            }
        }
    }

}

module.exports = Transaction;