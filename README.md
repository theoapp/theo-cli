## Theo CLI

[![npm version](https://badge.fury.io/js/theoapp-cli.svg)](https://www.npmjs.com/package/theoapp-cli)

CLI app to manage [Theo server](https://github.com/theoapp/theo-node)

### Summary

- [Install](#install)
- [Usage](#usage)
  - [Accounts](#accounts)
  - [Groups](#groups)
  - [SSH Keys](#ssh-keys)
  - [Permissions](#permissions)
  - [Authorized Keys](#authorized-keys)
- [Examples](#examples)

#### Install

`$ npm i -g theoapp-cli`

`theo` needs 2 variables to work: `THEO_URL` and `THEO_TOKEN`.   
They can be set as environment variables:

`THEO_URL=https://your.server.name THEO_TOKEN=your_secret_admin_token theo accounts list` 

Or they can be stored in a file:

```
THEO_URL=https://your.server.name
THEO_TOKEN=your_secret_admin_token
```

`theo` will look (in this order):

```
  $PWD/.env
  $HOME/.theo-cli/env
  /etc/theo-cli/env
```


#### Usage

##### Accounts

```
theo accounts <command>

Manage accounts

Commands:
  main.js accounts add [options]        Create account
  main.js accounts create [options]     Create account
  main.js accounts rm <id>              Remove account
  main.js accounts edit <id> [options]  Edit account
  main.js accounts get <id>             Get account
  main.js accounts list                 List accounts
  main.js accounts search               Search accounts
```

* List

```
theo accounts list

List accounts

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --limit, -l   Number of accounts to retrieve                          [number]
  --offset, -o  Offset of the query                                     [number]
```

* Search

```
theo accounts search

Search accounts

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --name, -n    Account name                                            [string]
  --email, -e   Account email                                           [string]
  --limit, -l   Number of accounts to retrieve                          [number]
  --offset, -o  Offset of the query                                     [number]
```

* Get

```
theo accounts get <id>

Get account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
``` 

* Add/Create
 
 ```
 theo accounts add [options]
 
 Create account
 
 Options:
   --version    Show version number                                     [boolean]
   --help       Show help                                               [boolean]
   --name, -n   Account name                                  [string] [required]
   --email, -e  Account email                                 [string] [required]
 ```
 
 * Change status
 
 ```
 theo accounts mod <id> [options]
 
 Edit account
 
 Options:
   --version      Show version number                                   [boolean]
   --help         Show help                                             [boolean]
   --enable, -e   Enable Account                                        [boolean]
   --disable, -d  Disable Account                                       [boolean]
 ```

* Remove

```
theo accounts rm <id>

Remove account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

* Edit

```
theo accounts edit <id> [options] <group>

Edit account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --add, -a  Add account to group                                      [boolean]
  --rm, -d   Remove account from group                                 [boolean]
```

##### Groups

```
theo groups <command>

Manage accounts

Manage groups

Commands:
  main.js groups add [options]        Create group
  main.js groups rm <id>              Remove group
  main.js groups edit <id> [options]  Edit group
  main.js groups get <id>             Get group
  main.js groups list                 List groups

```

* List

```
theo groups list

List groups

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --limit, -l   Number of groups to retrieve                            [number]
  --offset, -o  Offset of the query                                     [number]
```

* Get

```
theo groups get <id>
     
Get group
     
Options:
   --version  Show version number                                       [boolean]
   --help     Show help                                                 [boolean]
```

* Add

```
theo groups add [options]

Create group

Options:
  --version   Show version number                                      [boolean]
  --help      Show help                                                [boolean]
  --name, -n  Group name                                     [string] [required]
```

* Change status

```
theo groups mod <id> [options]

Edit group

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --action, -a  Action: enable|disable                       [string] [required]
```

* Remove

```
theo groups rm <id>
     
Remove group

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

* Edit

```
theo groups edit <id> [options] <account..>

Add/remove account(s) to/from group

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --add, -a  Add accounts to group                                     [boolean]
  --rm, -d   Remove accounts from group                                [boolean]
```
##### SSH Keys

```
theo keys <command>

Manage accounts' keys

Commands:
  main.js keys add <account> [options]     Add key to account
  main.js keys import <account> [options]  Imporrt keys to account from a
                                           service (github/gitlab)
  main.js keys rm <account> [options]      Remove key from account
```

* Add

```
theo keys add <account> [options]

Add key to account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --key, -k  Public ssh key                                           [required]
  --sign, -s        sign Public ssh key with private key provided       [string]
  --passphrase, -p  private key passhrase                               [string]
```

* Import 

```
theo keys import <account> [options]

Imporrt keys to account from a service (github/gitlab)

Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --service, -s   Service to import from                     [string] [required]
  --username, -u  Service's username                         [string] [required]
```

* Remove

```
theo keys rm <account> [options]
     
     Remove key from account
     
     Options:
       --version  Show version number                                       [boolean]
       --help     Show help                                                 [boolean]
       --key, -k  Public ssh key ID                                        [required]
```

##### Permissions

```
theo permissions <command>

Manage accounts' permissions

Commands:
  main.js permissions add <account>         Add permission to account         [options]
  main.js permissions rm <account>          Remove permission from account    [options]
```

* Add

```
theo permissions add [options]
     
     Add permission to account or group
     
     Options:
       --version      Show version number                                   [boolean]
       --help         Show help                                             [boolean]
       --account, -a  Account id                                             [string]
       --group, -g    Group id                                               [string]
       --host, -h     Host name                                   [string] [required]
       --user, -u     User name                                   [string] [required]
```

* Remove 

```
theo permissions rm <account> [options]
     
     Remove permission from account
     
     Options:
       --version         Show version number                                [boolean]
       --help            Show help                                          [boolean]
       --permission, -p  Permission ID                                     [required]
```

##### Authorized Keys

* Fetch authorized keys

```
theo authorized_keys [options]
     
     Test authorized_keys
     
     Options:
       --version   Show version number                                      [boolean]
       --help      Show help                                                [boolean]
       --host, -h  Host name                                      [string] [required]
       --user, -u  User name                                      [string] [required]
```

#### Examples

To create a new account with name _john.doe_ and email _john.doe@sample.com_

```
$ THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    accounts add \
    --name john.doe \
    --email john.doe@sample.com

+---------------------------------+
{
   "id": 1,
   "name": "john.doe",
   "email": "john.doe@sample.com",
   "active": 1,
   "public_keys": [],
   "permissions": []
}
+---------------------------------+
```

To add a new key to account _john.doe_ (Id 1):

```
$ THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    keys add john.doe@sample.com \
    -k "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost"

  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  {
     "account_id": "1",
     "keys": [
        {
           "key": "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost"
        }
     ]
  }
  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

To add a new key with signature to account _john.doe_ (Id 1):


```
$ THEO_PRIVATE_KEY="/home/macno/sign/private.pem" \
    THEO_PRIVATE_KEY_PASSPHRASE="abcd" \
    THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    keys add john.doe@sample.com \
    -k "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost"
    -s

  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  {
     "account_id": "1",
     "keys": [
        {
           "key": "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost",
           "signature": "1f01a031462da939ded812c9371e[...]b9c18ef6"
        }
     ]
  }
  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

To import `John Doe`'s public keys from his github account (which is `jdoe80`):

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    keys import john.doe@sample.com -s github -u jdoe80
    
    
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
{
   "account_id": 1,
   "public_keys": [
      {
         "id": 8,
         "public_key": "ssh-rsa AAAAB3[....]aRcd099sfCzz"
      },
      {
         "id": 9,
         "public_key": "ssh-rsa AAAAB3[.....]lSasfd3ds=="
      }
   ]
}
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

To add a new permission to _john.doe_ to let him login as user `ubuntu` to host `srv-sample-01`

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    permissions add \
    --account john.doe@sample.com \
    --host srv-sample-01 \
    --user ubuntu

+--------------------+
{
   "account_id": "1"
}
+--------------------+
```

To give permission to login as user `ubuntu` on all the servers named `test-xxxx`:
 
```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    permissions add \
    --account john.doe@sample.com \
    --host "test-%" \
    --user ubuntu
```

To create a new group `developers`

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    groups add --name developers
```

To add `john doe` to `developer` group

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    groups edit developers --add john.doe@sample.com
```

To grant access as user `deploy` on server `dev01` to group `developers`:
 
```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    permissions add \
    --group developers \
    --host "dev01" \
    --user deploy
```

